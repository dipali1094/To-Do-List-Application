import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoList, Task } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoListsSubject = new BehaviorSubject<TodoList[]>(this.loadFromStorage());
  todoLists$ = this.todoListsSubject.asObservable();

  private loadFromStorage(): TodoList[] {
    if (typeof window !== 'undefined' && localStorage.getItem('todoLists')) {
      return JSON.parse(localStorage.getItem('todoLists') || '[]');
    }
    return [];
  }
  
  private saveToStorage(data: TodoList[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todoLists', JSON.stringify(data));
    }
  }
  
  getTodoLists(): TodoList[] {
    return this.todoListsSubject.getValue();
  }

  addTodoList(title: string): TodoList {
    const newList: TodoList = {
      id: Date.now(),
      title,
      tasks: []
    };
    const updatedLists = [...this.getTodoLists(), newList];
    this.todoListsSubject.next(updatedLists);
    this.saveToStorage(updatedLists);
    return newList;
  }

  addTask(listId: number, task: Task): Task | null {
    const list = this.getTodoLists().find(l => l.id === listId);
    if (list) {
      list.tasks.push(task);
      this.saveToStorage(this.getTodoLists());
      return task;
    }
    return null;
  }
  
  toggleTaskStatus(listId: number, taskId: number): void {
    const list = this.getTodoLists().find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveToStorage(this.getTodoLists()); // this is important
      }
    }
  }
  
}
