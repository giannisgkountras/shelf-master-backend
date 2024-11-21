const express = require('express');
const bodyParser = require('body-parser');
const warehouseRoutes = require('./routes/warehouseRoutes');
const customerRoutes = require('./routes/customerRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./config/swagger');
const cors = require('cors');

const app = express();
// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

// Routes
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/customers', customerRoutes);

// Swagger
setupSwagger(app);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
