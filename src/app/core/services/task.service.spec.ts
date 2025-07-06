import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    const dummyTasks: Task[] = [
      { id: 1, tittle: 'Task 1', description: 'Description 1', completed: false },
      { id: 2, tittle: 'Task 2', description: 'Description 2', completed: true }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should create a task', () => {
    const newTask: Task = { tittle: 'New Task', description: 'New Description', completed: false };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual({ id: 1, ...newTask });
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, ...newTask });
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: 1, tittle: 'Updated Task', description: 'Updated Description', completed: true };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});