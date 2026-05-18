const express = require('express');

const router = express.Router();

const controller = require('./task.controller');
const validation = require('./task.validation');

const authMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');

router.use(authMiddleware);
/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener tareas del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', controller.list);

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
  controller.create
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
router.patch('/:id/complete', controller.complete);

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
router.delete('/:id', controller.delete);

module.exports = router;
