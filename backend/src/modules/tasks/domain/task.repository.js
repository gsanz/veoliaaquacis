class TaskRepository {
  async create(_data) {}

  async findAll(_userId, _options) {}

  async complete(_taskId) {}

  async delete(_taskId) {}
}

module.exports = TaskRepository;
