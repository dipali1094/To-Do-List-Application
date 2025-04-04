import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule],
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo list', () => {
    component.newListTitle = 'Test List';
    component.addList();
    expect(component.todoLists.length).toBeGreaterThan(0);
    expect(component.todoLists[0].title).toBe('Test List');
  });

  it('should not add a list with empty title', () => {
    component.newListTitle = ' ';
    const prevLength = component.todoLists.length;
    component.addList();
    expect(component.todoLists.length).toBe(prevLength);
  });
});