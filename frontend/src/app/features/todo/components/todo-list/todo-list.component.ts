import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  // Local state variables
  todoLists: TodoList[] = [];
  selectedList: TodoList | null = null;
  newListTitle = '';
  newTaskTitle = '';
  newTaskDescription = '';
  showAddTask = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject to sync UI with service state
    this.todoService.todoLists$.subscribe(lists => this.todoLists = lists);
  }

  // Set the selected list and hide the Add Task form
  selectList(list: TodoList): void {
    this.selectedList = list;
    this.showAddTask = false;
  }

  // Add a new to-do list (title only) and reset input
  async addList(): Promise<void> {
    if (!this.newListTitle.trim()) return;
    await this.todoService.addTodoList(this.newListTitle.trim());
    this.newListTitle = '';
  }

  // Add a new task to the currently selected list
  async addTask(): Promise<void> {
    if (!this.newTaskTitle.trim() || !this.selectedList) return;

    const task: Task = {
      id: Date.now(),
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim(),
      completed: false
    };

    await this.todoService.addTask(this.selectedList.id, task);
    
    // 🔁 Refresh selectedList from updated todoLists
    const updatedList = this.todoService.getTodoLists().find(l => l.id === this.selectedList?.id);
    if (updatedList) this.selectedList = updatedList;

    // Clear input fields
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }

  // Toggle task completion status
  async toggleTask(task: Task): Promise<void> {
    if (this.selectedList) {
      await this.todoService.toggleTaskStatus(this.selectedList.id, task.id);
    }
  }

  // Count how many tasks are completed in a given list
  getCompletedCount(list: TodoList): number {
    return list.tasks.filter(t => t.completed).length;
  }

  // Filtered tasks to display for the selected list
  filteredTasks(): Task[] {
    return this.selectedList ? this.selectedList.tasks : [];
  }

  // Toggle the visibility of the Add Task input section
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
  }
}
