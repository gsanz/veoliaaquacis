const LoginUseCase = require('../../../modules/auth/application/login.usecase');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs');

describe('LoginUseCase', () => {
  it('should return token if credentials are valid', async () => {
    const mockRepository = {
      findByEmail: jest.fn(),
    };

    const mockJwtService = {
      generateToken: jest.fn(),
    };

    const useCase = new LoginUseCase(mockRepository, mockJwtService);

    const user = {
      email: 'test@test.com',
      password: 'hashedPassword',
    };

    mockRepository.findByEmail.mockResolvedValue(user);

    bcrypt.compare.mockResolvedValue(true);

    mockJwtService.generateToken.mockReturnValue('fake-jwt-token');

    const result = await useCase.execute('test@test.com', '123456');

    expect(mockRepository.findByEmail).toHaveBeenCalledWith('test@test.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedPassword');
    expect(mockJwtService.generateToken).toHaveBeenCalledWith(user);

    expect(result).toBe('fake-jwt-token');
  });
});

it('should throw error if user does not exist', async () => {
  const mockRepository = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    generateToken: jest.fn(),
  };

  const useCase = new LoginUseCase(mockRepository, mockJwtService);

  mockRepository.findByEmail.mockResolvedValue(null);

  await expect(useCase.execute('wrong@mail.com', '123456')).rejects.toThrow(
    'Invalid credentials'
  );
});
