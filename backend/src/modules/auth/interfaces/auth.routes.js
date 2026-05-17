const express = require('express');

const router = express.Router();

const controller = require('./auth.controller');
const validation = require('./auth.validation');
const validationMiddleware = require('../../../middlewares/validation.middleware');

const authMiddleware = require('../../../middlewares/auth.middleware');
//router.use(authMiddleware);

router.post(
  '/register',
  authMiddleware,
  validation.registerValidation,
  validationMiddleware,
  controller.register
);

router.post(
  '/login',
  validation.loginValidation,
  validationMiddleware,
  controller.login
);

module.exports = router;
