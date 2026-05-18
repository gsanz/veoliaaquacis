const CreateTaskUseCase = require('../../../modules/tasks/application/create-task.usecase');

describe('CreateTaskUseCase', () => {
  it('should create a task successfully', async () => {
    const mockRepository = {
      create: jest.fn(),
    };

    const useCase = new CreateTaskUseCase(mockRepository);

    const taskData = {
      title: 'Test task',
      responsible: 'John',
      userId: 'user123',
    };

    mockRepository.create.mockResolvedValue(taskData);

    const result = await useCase.execute(taskData);

    expect(mockRepository.create).toHaveBeenCalledWith(taskData);
    expect(result.title).toBe('Test task');
  });
});
