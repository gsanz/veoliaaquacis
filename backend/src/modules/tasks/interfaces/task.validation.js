const { body } = require('express-validator');

exports.createTaskValidation = [
  body('title').notEmpty(),
  body('responsible').notEmpty(),
];
