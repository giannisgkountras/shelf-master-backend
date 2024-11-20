const express = require('express');
const bodyParser = require('body-parser');
const warehouseRoutes = require('./routes/warehouseRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./config/swagger');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/warehouses', warehouseRoutes);

// Swagger
setupSwagger(app);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
