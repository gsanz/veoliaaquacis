const Task = require('./task.model');

class MongoTaskRepository {
  async create(data) {
    return Task.create(data);
  }

  async findAll(userId, { page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find({ userId }).skip(skip).limit(limit).sort({ createdAt: -1 }),

      Task.countDocuments({ userId }),
    ]);

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
    return Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });
  }

  async delete(taskId) {
    return Task.findByIdAndDelete(taskId);
  }
}

module.exports = MongoTaskRepository;
