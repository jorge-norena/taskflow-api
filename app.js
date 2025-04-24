// app.js
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a TaskFlow API');
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

module.exports = app;
