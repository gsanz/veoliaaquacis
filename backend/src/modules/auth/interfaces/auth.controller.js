const MongoAuthRepository = require('../infrastructure/auth.repository.mongo');
const RegisterUseCase = require('../application/register.usecase');
const LoginUseCase = require('../application/login.usecase');
const jwtService = require('../infrastructure/jwt.service');

const repository = new MongoAuthRepository();

exports.register = async (req, res, next) => {
  try {
    const useCase = new RegisterUseCase(repository);

    const user = await useCase.execute(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const useCase = new LoginUseCase(repository, jwtService);

    const token = await useCase.execute(req.body.email, req.body.password);

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
