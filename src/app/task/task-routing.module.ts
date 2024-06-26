import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentTaskComponent } from './current-task/current-task.component';

const routes: Routes = [
    {path: 'tasks', component: TasksListComponent},
    {path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard]},
    {path:'task/:id', component: CurrentTaskComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
