const RegisterUseCase = require('../application/register.usecase');
const LoginUseCase = require('../application/login.usecase');

// Cambiamos a una función que recibe las dependencias
module.exports = (repository, jwtService) => {
  return {
    register: async (req, res, next) => {
      try {
        const useCase = new RegisterUseCase(repository);
        const user = await useCase.execute(req.body);
        res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    },

    login: async (req, res, next) => {
      try {
        const useCase = new LoginUseCase(repository, jwtService);
        const token = await useCase.execute(req.body.email, req.body.password);
        res.json({ token });
      } catch (error) {
        next(error);
      }
    },
  };
};
