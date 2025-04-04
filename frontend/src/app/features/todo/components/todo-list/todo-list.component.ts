import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoList, Task } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todoLists: TodoList[] = [];
  selectedList: TodoList | null = null;
  newListTitle = '';
  newTaskTitle = '';
  newTaskDescription = '';
  filter: 'all' | 'completed' | 'active' = 'all';
  visibleTasks: Task[] = [];
  showAddTask = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.refreshLists();
  }

  selectList(list: TodoList): void {
    this.selectedList = list;
    this.filter = 'all';
  }

  addList(): void {
    if (this.newListTitle.trim()) {
      const newList = this.todoService.addTodoList(this.newListTitle.trim());
      this.todoLists.push(newList);
      this.selectList(newList);
      this.newListTitle = '';
    }
  }

  addTask(): void {
    if (this.newTaskTitle.trim() && this.selectedList) {
      const task: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        description: this.newTaskDescription.trim(),
        completed: false
      };
      this.todoService.addTask(this.selectedList.id, task);
      // Refresh the selected list to reflect new task
      const updatedList = this.todoLists.find(list => list.id === this.selectedList?.id);
      if (updatedList) {
        this.selectedList = updatedList;
      }

      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  toggleTask(task: Task): void {
    if (this.selectedList) {
      this.todoService.toggleTaskStatus(this.selectedList.id, task.id);
      const updatedLists = this.todoService.getTodoLists();
      this.todoLists = updatedLists;
      this.selectedList = updatedLists.find(list => list.id === this.selectedList?.id) || null;
    }
  }
  
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
  }

  filteredTasks(): Task[] {
    return this.selectedList ? this.selectedList.tasks : [];
  }

  getCompletedCount(list: TodoList): number {
    return list.tasks.filter((t: Task) => t.completed).length;
  }

  private refreshLists(): void {
    this.todoLists = this.todoService.getTodoLists();

    // After refreshing all lists, update the selectedList with fresh reference
    if (this.selectedList) {
      const updatedList = this.todoLists.find(list => list.id === this.selectedList?.id);
      this.selectedList = updatedList ? { ...updatedList } : null;
    }
  }

}