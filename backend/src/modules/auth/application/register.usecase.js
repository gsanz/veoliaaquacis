const bcrypt = require('bcryptjs');

class RegisterUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(data) {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.authRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

module.exports = RegisterUseCase;
