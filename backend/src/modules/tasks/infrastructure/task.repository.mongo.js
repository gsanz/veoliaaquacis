const Task = require('./task.model');

class MongoTaskRepository {
  async create(data) {
    return Task.create(data);
  }

  async findAll(userId, { skip = 0, limit = 10 }) {
    const [tasks, total] = await Promise.all([
      Task.find({ userId }).skip(skip).limit(limit),
      Task.countDocuments({ userId }),
    ]);

    return {
      data: tasks,
      meta: {
        total,
        page: Math.floor(skip / limit) + 1,
        limit,
        pages: Math.ceil(total / limit),
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
