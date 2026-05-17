class CompleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    return this.taskRepository.complete(taskId);
  }
}

module.exports = CompleteTaskUseCase;
