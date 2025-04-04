const store = require('../data/store');

exports.getTodoLists = (req, res) => {
  res.json(store.todoLists);
};

exports.addTodoList = (req, res) => {
  const newList = req.body;
  store.todoLists.push(newList);
  res.status(200).json(newList);
};

exports.addTaskToList = (req, res) => {
  const listId = parseInt(req.params.listId);
  const task = req.body;
  const list = store.todoLists.find(l => l.id === listId);

  if (list) {
    list.tasks.push(task);
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};

exports.updateTaskStatus = (req, res) => {
  const listId = parseInt(req.params.listId);
  const taskId = parseInt(req.params.taskId);
  const updatedTask = req.body;
  const list = store.todoLists.find(l => l.id === listId);

  if (list) {
    const taskIndex = list.tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
      list.tasks[taskIndex] = updatedTask;
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } else {
    res.status(404).json({ message: 'List not found' });
  }
};
