class TaskRepository {
  async create(_data) {
    throw new Error('Method "create" must be implemented');
  }

  async findAll(_userId, _options) {
    throw new Error('Method "findAll" must be implemented');
  }

  async complete(_taskId) {
    throw new Error('Method "complete" must be implemented');
  }

  async delete(_taskId) {
    throw new Error('Method "delete" must be implemented');
  }
}

module.exports = TaskRepository;
