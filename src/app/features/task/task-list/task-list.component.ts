import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTaskToEdit: Task | null = null;
  showEditForm: boolean = false;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  onCreateTask(newTask: Task): void {
    this.taskService.createTask(newTask).subscribe((createdTask: Task) => {
         console.log('Created Task:', createdTask); // Debugging
   this.tasks = [...this.tasks, createdTask]; 
   this.cdr.detectChanges(); // Add the created task to the tasks array
  }, error => {
    console.error('Error creating task:', error);
    alert('Failed to create task. Please try again.');
  });
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      task.completed = updatedTask.completed; // Update local UI
    });
  }

  onEdit(task: Task) {
    this.selectedTaskToEdit = task;
    this.showEditForm = true;
  }

  onSaveEdit(updatedTask: Task) {
  this.taskService.updateTask(updatedTask).subscribe(() => {
   // reload the updated list
    this.showEditForm = false;
  });
}

}