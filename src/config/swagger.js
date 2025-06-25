import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'LudORTeca (GameHub) API',
      version: '1.0.0',
      description: 'Documentación de la API para la plataforma social de compra, préstamo y gestión de videojuegos.',
    },
    servers: [
      {
        url: 'https://trabajopracticofinal.onrender.com/', 
        description: 'Servidor de Producción',
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
    security: [{
      bearerAuth: []
    }],
  },
  apis: [
    './src/routes/*.js', // Ruta a tus archivos de rutas donde añadirás los comentarios JSDoc
  ],
};

export const specs = swaggerJsdoc(options);

