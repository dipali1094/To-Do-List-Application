import { TodoService } from '../../services/todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    service = new TodoService();
  });

  it('should add a new list', () => {
    service.addTodoList('Test List');
    const lists = service.getTodoLists();
    expect(lists.length).toBe(1);
    expect(lists[0].title).toBe('Test List');
  });

  it('should add a new task to the list', () => {
    service.addTodoList('Test List');
    const listId = service.getTodoLists()[0].id;
    service.addTask(listId, {
      id: 1,
      title: 'Test Task',
      description: 'Task Description',
      completed: false
    });
    const tasks = service.getTodoLists()[0].tasks;
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should persist data to localStorage', () => {
    service.addTodoList('Persisted List');
    const newService = new TodoService();
    expect(newService.getTodoLists().length).toBe(1);
    expect(newService.getTodoLists()[0].title).toBe('Persisted List');
  });
});