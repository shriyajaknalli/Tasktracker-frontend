import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from 'src/app/core/services/task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'toggleTaskCompletion']);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const mockTasks = [{ id: 1, title: 'Test Task', description: 'Test Description', completed: false }];
    taskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.tasks).toEqual(mockTasks);
    expect(taskService.getTasks).toHaveBeenCalled();
  });

  it('should toggle task completion', () => {
    const task = { id: 1, title: 'Test Task', description: 'Test Description', completed: false };
    component.tasks = [task];

    taskService.toggleTaskCompletion.and.returnValue(of({ ...task, completed: true }));

    component.toggleCompleted(task);

    expect(task.completed).toBeTrue();
    expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith(task);
  });
});