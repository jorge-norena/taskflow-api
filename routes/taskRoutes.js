const express = require("express");
const { body } = require('express-validator');
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, taskController.getAllTasks);
router.post(
  "/",
  authMiddleware,
  body("title").notEmpty().withMessage("El título es obligatorio"),
  taskController.createTask
);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
