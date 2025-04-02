const request = require('supertest');
const express = require('express');
const todoRoutes = require('../routes/todo.routes');

const app = express();
app.use(express.json());
app.use('/api', todoRoutes);

describe('To-Do API', () => {
  it('should get all to-do lists summary', async () => {
    const res = await request(app).get('/api/lists');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new to-do list', async () => {
    const res = await request(app).post('/api/lists').send({
      title: 'Test List'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test List');
  });

  it('should add a task to a list', async () => {
    const res = await request(app).post('/api/lists/1/tasks').send({
      title: 'Test Task',
      description: 'Task description'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should toggle task completion', async () => {
    const res = await request(app).put('/api/lists/1/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('completed');
  });

  it('should return 404 for non-existing list', async () => {
    const res = await request(app).get('/api/lists/999/tasks');
    expect(res.statusCode).toBe(404);
  });
});
