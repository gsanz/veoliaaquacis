const ListTasksUseCase = require('../../../modules/tasks/application/list-tasks.usecase');

describe('ListTasksUseCase', () => {
  it('should return paginated tasks', async () => {
    const mockRepository = {
      findAll: jest.fn(),
    };

    const useCase = new ListTasksUseCase(mockRepository);

    const userId = 'user123';

    const paginationInput = {
      page: 1,
      limit: 10,
    };

    const mockResult = {
      data: [{ title: 'Task 1' }, { title: 'Task 2' }],
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      },
    };

    mockRepository.findAll.mockResolvedValue(mockResult);

    const result = await useCase.execute(userId, paginationInput);

    expect(mockRepository.findAll).toHaveBeenCalledWith(
      userId,
      paginationInput
    );

    expect(result.data.length).toBe(2);
    expect(result.pagination.page).toBe(1);
  });
});
