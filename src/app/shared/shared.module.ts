import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TaskFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }