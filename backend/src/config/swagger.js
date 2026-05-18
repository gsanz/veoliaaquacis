const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Veolia API',
      version: '1.0.0',
      description: 'API de autenticación y tareas (Clean Architecture)',
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

    // 🔐 Aplica JWT globalmente (puedes quitarlo por endpoint si quieres)
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 📌 Swagger lee anotaciones en rutas
  apis: ['./src/modules/**/interfaces/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
