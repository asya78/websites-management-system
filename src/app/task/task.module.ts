import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksListComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule
  ]
})
export class TaskModule { }
