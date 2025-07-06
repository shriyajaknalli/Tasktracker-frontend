import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from 'src/app/core/services/task.service';
import { of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskFormComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createTask on submit', () => {
    const task = { tittle: 'Test Task', description: 'Test Description', completed: false };
    taskService.createTask.and.returnValue(of(task));

    component.task = task;
    component.onSubmit();

    expect(taskService.createTask).toHaveBeenCalledWith(task);
  });

  it('should reset the form after submission', () => {
    const task = { tittle: 'Test Task', description: 'Test Description', completed: false };
    taskService.createTask.and.returnValue(of(task));

    component.task = task;
    component.onSubmit();

    expect(component.task).toEqual({ tittle: '', description: '', completed: false });
  });
});