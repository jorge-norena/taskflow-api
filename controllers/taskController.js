// controllers/taskController.js
let tasks = [
    { id: 1, title: 'Primera tarea', completed: false },
    { id: 2, title: 'Segunda tarea', completed: true }
  ];
  
  exports.getAllTasks = (req, res) => {
    res.json(tasks);
  };
  
  exports.createTask = (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
  };
  
  exports.deleteTask = (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
  };
  