const express = require('express');
const router = express.Router();

// 1. Importas el repositorio y el servicio JWT
const MongoAuthRepository = require('../infrastructure/auth.repository.mongo');
const jwtService = require('../infrastructure/jwt.service');

// 2. Instancias el repositorio
const repository = new MongoAuthRepository();

// 3. Importas el generador del controlador y le inyectas las dependencias
const authControllerFactory = require('./auth.controller');
const controller = authControllerFactory(repository, jwtService);

const validation = require('./auth.validation');
const validationMiddleware = require('../../../middlewares/validation.middleware');
const authMiddleware = require('../../../middlewares/auth.middleware');

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validación
 */
router.post(
  '/register',
  // authMiddleware, // Comentado por seguridad (quítale las barras si realmente necesitas token para registrar usuarios)
  validation.registerValidation,
  validationMiddleware,
  controller.register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post(
  '/login',
  validation.loginValidation,
  validationMiddleware,
  controller.login
);

module.exports = router;
