const express = require('express');

const router = express.Router();

const controller = require('./task.controller');
const validation = require('./task.validation');

const authMiddleware = require('../../../middlewares/auth.middleware');
const validationMiddleware = require('../../../middlewares/validation.middleware');

router.use(authMiddleware);

router.get('/', controller.list);

router.post(
  '/',
  validation.createTaskValidation,
  validationMiddleware,
  controller.create
);

router.patch('/:id/complete', controller.complete);

router.delete('/:id', controller.delete);

module.exports = router;
