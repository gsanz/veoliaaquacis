const TaskRepository = require('../domain/task.repository'); // Importamos el puerto
const TaskModel = require('./task.model'); // El modelo de Mongoose
const TaskEntity = require('../domain/task.entity'); // La entidad de dominio

class MongoTaskRepository extends TaskRepository {
  // Mapeador interno para transformar el documento de Mongo a Entidad de Dominio
  _mapToEntity(mongoDoc) {
    if (!mongoDoc) return null;

    console.log('INSIDE MONGODOC', mongoDoc);

    return new TaskEntity({
      // Si mongoDoc es un objeto de lean(), el id viene en ._id
      id: mongoDoc._id ? mongoDoc._id.toString() : null,
      title: mongoDoc.title,
      description: mongoDoc.description,
      responsible: mongoDoc.responsible,
      completed: mongoDoc.completed || false,
      userId: mongoDoc.userId ? mongoDoc.userId.toString() : null,
      createdAt: mongoDoc.createdAt,
    });
  }

  async create(data) {
    const newTask = await TaskModel.create(data);
    return this._mapToEntity(newTask);
  }

  async findAll(userId, { page = 1, limit = 10 }) {
    console.log('FINDALL FOR USERID:', userId);

    // Seguridad
    if (!userId) {
      return {
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }

    const skip = (page - 1) * limit;

    const query = { userId };

    const [mongoTasks, total] = await Promise.all([
      TaskModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),

      TaskModel.countDocuments(query),
    ]);

    // Mapear a entidades de dominio
    const tasks = mongoTasks.map((task) => this._mapToEntity(task));

    console.log('MAPPED TASKS COUNT:', tasks.length);
    console.log(tasks);

    return {
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async complete(taskId) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    ).lean();

    return this._mapToEntity(updatedTask);
  }

  async delete(taskId) {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId).lean();
    return this._mapToEntity(deletedTask);
  }
}

module.exports = MongoTaskRepository;
