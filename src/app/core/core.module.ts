import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [TaskService],
  exports: []
})
export class CoreModule { }