const express = require('express');

const router = express.Router();

const controller = require('./auth.controller');
const validation = require('./auth.validation');
const validationMiddleware = require('../../../middlewares/validation.middleware');

const authMiddleware = require('../../../middlewares/auth.middleware');
//router.use(authMiddleware);

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
  authMiddleware,
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
