class ListTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId, options = {}) {
    const { page = 1, limit = 10 } = options;

    const skip = (page - 1) * limit;

    return this.taskRepository.findAll(userId, {
      skip,
      limit: Number(limit),
      page: Number(page),
    });
  }
}

module.exports = ListTasksUseCase;
