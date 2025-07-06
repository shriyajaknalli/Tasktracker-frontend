import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

task: Task = {
  tittle: '',
  description: '',
  completed: false
}

constructor(private taskService: TaskService) { }

onSubmit(){
  this.taskService.createTask(this.task).subscribe(response => {
    console.log('Task created:', response);
      alert('Task added!');
      this.task = { tittle: '', description: '', completed: false };  // Reset the form
  });

}

}
