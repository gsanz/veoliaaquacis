const express = require('express');
const router = express.Router();

// 1. Importamos la Infraestructura y los Casos de Uso (Aplicación)
const MongoTaskRepository = require('../infrastructure/task.repository.mongo');
const CreateTaskUseCase = require('../application/create-task.usecase');
const ListTasksUseCase = require('../application/list-tasks.usecase');
const CompleteTaskUseCase = require('../application/complete-task.usecase');
const DeleteTaskUseCase = require('../application/delete-task.usecase');

// 2. Importamos los adaptadores de entrada (Controlador, Validaciones, Middlewares)
const controller = require('./task.controller');
const validation = require('./task.validation');
const authMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');

// 3. INYECCIÓN DE DEPENDENCIAS: Juntamos las piezas del Hexágono
const taskRepository = new MongoTaskRepository();

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const listTasksUseCase = new ListTasksUseCase(taskRepository);
const completeTaskUseCase = new CompleteTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

// Aplicamos el middleware global de autenticación para estas rutas
router.use(authMiddleware);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener tareas del usuario con paginación
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Elementos por página
 *     responses:
 *       200:
 *         description: Lista paginada de tareas
 */
router.get('/', controller.list(listTasksUseCase));

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Crear tarea
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - responsible
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               responsible:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post(
  '/',
  validation.createTaskValidation,
  validationMiddleware,
  controller.create(createTaskUseCase)
);

/**
 * @openapi
 * /api/tasks/{id}/complete:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Marcar tarea como completada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.patch('/:id/complete', controller.complete(completeTaskUseCase));

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Eliminar tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
router.delete('/:id', controller.delete(deleteTaskUseCase));

module.exports = router;
