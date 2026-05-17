class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(data) {
    return this.taskRepository.create(data);
  }
}

module.exports = CreateTaskUseCase;
