const bcrypt = require('bcryptjs');

class LoginUseCase {
  constructor(authRepository, jwtService) {
    this.authRepository = authRepository;
    this.jwtService = jwtService;
  }

  async execute(email, password) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    return this.jwtService.generateToken(user);
  }
}

module.exports = LoginUseCase;
