class ListTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId, { page = 1, limit = 10 }) {
    return this.taskRepository.findAll(userId, {
      page,
      limit,
    });
  }
}

module.exports = ListTasksUseCase;
