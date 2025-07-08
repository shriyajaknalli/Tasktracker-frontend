import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() taskToEdit: Task | null = null;
@Input() mode: 'create' | 'edit' = 'create';
@Output() formSubmit = new EventEmitter<Task>();
  task: Task = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  onSubmit() {
   if(this.mode === 'edit' && this.taskToEdit?.id){
      this.taskService.updateTask({ ...this.task, id: this.taskToEdit.id }).subscribe(() => {
        alert('Task updated!');
        this.resetForm();
        this.formSubmit.emit({ ...this.task, id: this.taskToEdit!.id });          
      }, error => {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
      })
   
    }
    else
    {
      this.taskService.createTask(this.task).subscribe((createdTask: Task)=>{
        alert('Task created!');
        this.formSubmit.emit(createdTask);
        console.log('Emitted Task:', createdTask);
        this.resetForm();
        
      }, error => {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
      })
    }
  }

  private resetForm() {
    this.task = { title: '', description: '', completed: false };
  }
}