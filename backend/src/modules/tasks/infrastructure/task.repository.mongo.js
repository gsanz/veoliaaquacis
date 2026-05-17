const Task = require('./task.model');

class MongoTaskRepository {
  async create(data) {
    return Task.create(data);
  }

  async findAll(userId) {
    return Task.find({ userId });
  }

  async complete(taskId) {
    return Task.findByIdAndUpdate(
      taskId,
      {
        completed: true,
      },
      {
        new: true,
      }
    );
  }

  async delete(taskId) {
    return Task.findByIdAndDelete(taskId);
  }
}

module.exports = MongoTaskRepository;
