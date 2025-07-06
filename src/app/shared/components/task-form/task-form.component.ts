import { Component } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  onSubmit() {
    this.taskService.createTask(this.task).subscribe(response => {
      console.log('Task created:', response);
      alert('Task added!');
      this.resetForm();
    });
  }

  private resetForm() {
    this.task = { title: '', description: '', completed: false };
  }
}