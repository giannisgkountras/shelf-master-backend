const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const setupSwagger = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger Docs available at /docs');
};

module.exports = setupSwagger;
