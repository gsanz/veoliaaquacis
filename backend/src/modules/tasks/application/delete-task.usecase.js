class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    const deletedTask = await this.taskRepository.delete(taskId);

    if (!deletedTask) {
      throw new Error('Task not found');
    }

    return deletedTask;
  }
}

module.exports = DeleteTaskUseCase;
