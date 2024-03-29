import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Task } from 'src/app/types/task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  constructor(
    private db: AngularFireDatabase, 
    private taskService: TaskService,
    public router: Router
    ) { }

  addTask(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      
      return;
    }

    const task: Task = {
      taskDate: form.value.taskDate,
      taskDevelopers: form.value.taskDevelopers,
      taskImg: form.value.taskImg,
      taskLink: form.value.taskLink,
      taskName: form.value.taskName,
      taskSite: form.value.taskSite
    };
   
    this.taskService.addTask(task);
    this.router.navigate(['tasks']);
  }
}
