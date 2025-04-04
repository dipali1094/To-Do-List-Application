const request = require('supertest');
const express = require('express');
const todoRoutes = require('../routes/todo.routes');
const store = require('../data/store');

const app = express();
app.use(express.json());
app.use(todoRoutes);

beforeEach(() => {
  // Reset data before each test
  store.todoLists.length = 0;
});

test('GET /api/todos should return an empty array initially', async () => {
  const res = await request(app).get('/api/todos');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /api/todos should add a new to-do list', async () => {
  const list = { id: 1, title: 'Work', tasks: [] };
  const res = await request(app).post('/api/todos').send(list);
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Work');
});

test('POST /api/todos/:listId/tasks should add a task to a list', async () => {
  const list = { id: 2, title: 'Shopping', tasks: [] };
  await request(app).post('/api/todos').send(list);

  const task = { id: 101, title: 'Buy milk', description: '2 liters', completed: false };
  const res = await request(app).post('/api/todos/2/tasks').send(task);

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Buy milk');
});

test('PUT /api/todos/:listId/tasks/:taskId should update task status', async () => {
  const list = {
    id: 3,
    title: 'Fitness',
    tasks: [{ id: 201, title: 'Run', description: '5km', completed: false }]
  };
  store.todoLists.push(list);

  const updatedTask = { id: 201, title: 'Run', description: '5km', completed: true };
  const res = await request(app).put('/api/todos/3/tasks/201').send(updatedTask);

  expect(res.statusCode).toBe(200);
  expect(res.body.completed).toBe(true);
});
