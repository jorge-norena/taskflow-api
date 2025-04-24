const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }); // Solo tareas del usuario autenticado
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title } = req.body;
    const newTask = new Task({
      title,
      user: req.userId // ¡Aquí asociamos la tarea al usuario!
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};


// Eliminar tarea por ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });

    await task.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: id, user: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }

    // Actualiza solo los campos proporcionados
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

