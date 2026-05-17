require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../modules/auth/infrastructure/auth.model');
const Task = require('../modules/tasks/infrastructure/task.model');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // 👇 comprobar si ya está seedado
    const usersCount = await User.countDocuments();

    if (usersCount > 0) {
      console.log('Database already seeded');
      process.exit();
    }

    // limpiar colecciones
    await User.deleteMany();
    await Task.deleteMany();

    // contraseña segura real
    const hashedPassword = await bcrypt.hash('123456', 10);

    // crear usuario demo
    const user = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
    });

    // crear tasks demo
    await Task.create([
      {
        title: 'Task 1',
        description: 'First task',
        responsible: 'Admin',
        userId: user._id,
        completed: false,
      },
      {
        title: 'Task 2',
        description: 'Second task',
        responsible: 'Admin',
        userId: user._id,
        completed: false,
      },
    ]);

    console.log('Database seeded successfully');

    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
