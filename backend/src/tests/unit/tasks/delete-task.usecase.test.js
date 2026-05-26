const DeleteTaskUseCase = require('../../../modules/tasks/application/delete-task.usecase');
describe('DeleteTaskUseCase', () => {
  it('should delete task', async () => {
    const mockRepository = {
      delete: jest.fn(),
    };

    const useCase = new DeleteTaskUseCase(mockRepository);

    mockRepository.delete.mockResolvedValue(true);

    const result = await useCase.execute('task123');

    expect(mockRepository.delete).toHaveBeenCalledWith('task123');
    expect(result).toBe(true);
  });

  it('should throw error if id is missing', async () => {
    const mockRepository = {
      delete: jest.fn(),
    };

    const useCase = new DeleteTaskUseCase(mockRepository);

    await expect(useCase.execute()).rejects.toThrow('Task ID is required');
  });
});
