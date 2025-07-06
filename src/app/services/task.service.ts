import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from '../models/Task'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private HttpClient: HttpClient) { }

     getTasks(): Observable<Task[]> {
      return this.HttpClient.get<Task[]>(this.baseUrl);
       }

       createTask(task: Task): Observable<Task> {
        return this.HttpClient.post<Task>(this.baseUrl, task);
       }

       updateTask(task:Task): Observable<Task> {
        return this.HttpClient.put<Task>(`${this.baseUrl}/${task.id}`, task);
       }
        deleteTask(id: number): Observable<void> {
          return this.HttpClient.delete<void>(`${this.baseUrl}/${id}`);
        }

}
