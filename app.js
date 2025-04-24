// app.js
const express = require('express');
const app = express();
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a TaskFlow API');
});

// Agregar las rutas de tareas bajo /api/tasks
app.use('/api/tasks', taskRoutes);

module.exports = app;
