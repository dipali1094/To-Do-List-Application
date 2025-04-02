const { todoLists } = require("../data/store");

exports.getAllLists = (req, res) => {
  const summaries = todoLists.map(list => ({
    id: list.id,
    title: list.title,
    totalTasks: list.tasks.length,
    completedTasks: list.tasks.filter(task => task.completed).length
  }));
  res.json(summaries);
};

exports.getTasksByListId = (req, res) => {
  const list = todoLists.find(l => l.id === parseInt(req.params.id));
  if (!list) return res.status(404).json({ message: "List not found" });
  res.json(list.tasks);
};

exports.addList = (req, res) => {
  const { title } = req.body;
  const newList = {
    id: todoLists.length + 1,
    title,
    tasks: [{ id: 1, title: "laundry", description: "Wash and dry", completed: false },
        { id: 2, title: "Buy", description: "Milk, Bread", completed: true }]
  };
  todoLists.push(newList);
  res.status(201).json(newList);
};

exports.addTask = (req, res) => {
  const { id } = req.params;
  const list = todoLists.find(l => l.id === parseInt(id));
  if (!list) return res.status(404).json({ message: "List not found" });

  const { title, description } = req.body;
  const newTask = {
    id: list.tasks.length + 1,
    title,
    description,
    completed: false
  };
  list.tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.toggleTask = (req, res) => {
  const { id, taskId } = req.params;
  const list = todoLists.find(l => l.id === parseInt(id));
  if (!list) return res.status(404).json({ message: "List not found" });

  const task = list.tasks.find(t => t.id === parseInt(taskId));
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = !task.completed;
  res.json(task);
};
