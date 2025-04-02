const express = require("express");
const router = express.Router();
const controller = require("../controllers/todo.controller");

router.get("/lists", controller.getAllLists);
router.get("/lists/:id/tasks", controller.getTasksByListId);
router.post("/lists", controller.addList);
router.post("/lists/:id/tasks", controller.addTask);
router.put("/lists/:id/tasks/:taskId", controller.toggleTask);

module.exports = router;
