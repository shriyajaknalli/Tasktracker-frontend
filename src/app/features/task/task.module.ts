import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TaskListComponent
  ]
})
export class TaskModule { }