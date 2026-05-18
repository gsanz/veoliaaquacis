const MongoTaskRepository = require('../infrastructure/task.repository.mongo');

const CreateTaskUseCase = require('../application/create-task.usecase');
const ListTasksUseCase = require('../application/list-tasks.usecase');
const CompleteTaskUseCase = require('../application/complete-task.usecase');
const DeleteTaskUseCase = require('../application/delete-task.usecase');

const repository = new MongoTaskRepository();

exports.create = async (req, res, next) => {
  try {
    const useCase = new CreateTaskUseCase(repository);

    const task = await useCase.execute({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const useCase = new ListTasksUseCase(repository);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const result = await useCase.execute(req.user.id, {
      page,
      limit,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.complete = async (req, res, next) => {
  try {
    const useCase = new CompleteTaskUseCase(repository);

    const task = await useCase.execute(req.params.id);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const useCase = new DeleteTaskUseCase(repository);

    await useCase.execute(req.params.id);

    res.json({
      message: 'Task deleted',
    });
  } catch (error) {
    next(error);
  }
};
