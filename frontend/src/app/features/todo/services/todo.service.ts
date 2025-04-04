import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoList, Task } from '../models/todo.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todoListsSubject = new BehaviorSubject<TodoList[]>([]);
  todoLists$ = this.todoListsSubject.asObservable();

  private baseUrl = `${environment.development.apiBaseUrl}/todos`;

  constructor() {
    this.loadFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadFromStorage(): void {
    if (this.isBrowser()) {
      const data = localStorage.getItem('todoLists');
      if (data) {
        this.todoListsSubject.next(JSON.parse(data));
      } else {
        this.fetchFromBackend();
      }
    }
  }

  private updateStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem('todoLists', JSON.stringify(this.todoListsSubject.value));
    }
  }

  getTodoLists(): TodoList[] {
    return this.todoListsSubject.value;
  }

  async fetchFromBackend(): Promise<void> {
    try {
      const data = await this.fetchTodoListsFromBackend();
      this.todoListsSubject.next(data);
      this.updateStorage();
    } catch (err) {
      console.error('Error fetching from backend:', err);
    }
  }

  async addTodoList(title: string): Promise<void> {
    const newList: TodoList = { id: Date.now(), title, tasks: [] };
    const updated = [...this.todoListsSubject.value, newList];
    this.todoListsSubject.next(updated);
    this.updateStorage();
    await this.saveListToBackend(newList);
  }

  async addTask(listId: number, task: Task): Promise<void> {
    const lists = this.todoListsSubject.value.map(list =>
      list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
    );
    this.todoListsSubject.next(lists);
    this.updateStorage();
    await this.saveTaskToBackend(listId, task);
  }

  async toggleTaskStatus(listId: number, taskId: number): Promise<void> {
    const lists = this.todoListsSubject.value.map(list => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    this.todoListsSubject.next(lists);
    this.updateStorage();
    const task = lists.find(l => l.id === listId)?.tasks.find(t => t.id === taskId);
    if (task) {
      await this.updateTaskStatusInBackend(listId, taskId, task);
    }
  }

  // ===================== Backend Helpers =====================

  private async fetchTodoListsFromBackend(): Promise<TodoList[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Failed to fetch todo lists');
    return await res.json();
  }

  private async saveListToBackend(list: TodoList): Promise<void> {
    try {
      await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });
    } catch (error) {
      console.error('Failed to save list to backend', error);
    }
  }

  private async saveTaskToBackend(listId: number, task: Task): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/${listId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    } catch (error) {
      console.error('Failed to save task to backend', error);
    }
  }

  private async updateTaskStatusInBackend(listId: number, taskId: number, task: Task): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/${listId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    } catch (error) {
      console.error('Failed to update task status in backend', error);
    }
  }
}
