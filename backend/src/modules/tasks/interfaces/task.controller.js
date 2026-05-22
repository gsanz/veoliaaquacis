// task.controller.js
// NOTA: Este archivo no requiere imports de capas internas (Casos de uso o Repositorios)
// ya que recibe las dependencias por parámetro desde el enrutador.

/**
 * Crear una nueva tarea
 * Recibe el caso de uso por parámetro y devuelve el middleware de Express
 */
exports.create = (createTaskUseCase) => async (req, res, next) => {
  try {
    const task = await createTaskUseCase.execute({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Listar las tareas del usuario con paginación
 */
exports.list = (listTasksUseCase) => async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const result = await listTasksUseCase.execute(req.user.id, {
      page,
      limit,
    });
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Marcar una tarea como completada
 */
exports.complete = (completeTaskUseCase) => async (req, res, next) => {
  try {
    const task = await completeTaskUseCase.execute(req.params.id);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar una tarea
 */
exports.delete = (deleteTaskUseCase) => async (req, res, next) => {
  try {
    await deleteTaskUseCase.execute(req.params.id);

    res.status(200).json({
      message: 'Task deleted',
    });
  } catch (error) {
    next(error);
  }
};
