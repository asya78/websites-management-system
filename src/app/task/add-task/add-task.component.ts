import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/types/task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  tasks: Task[] | undefined;

  constructor(
    private taskService: TaskService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }

    // Вземете текущата дата
    const currentDate = Date.now();    

    const task: Task = {
      id: '',
      taskDate:  currentDate, 
      taskDevelopers: form.value.taskDevelopers,
      taskImg: form.value.taskImg,
      taskLink: form.value.taskLink,
      taskName: form.value.taskName,
      taskSite: form.value.taskSite,
    };   

    this.taskService.addTask(task).then(() => {
      console.log('Task added successfully!');
      this.router.navigate(['tasks']);
    }).catch((error: any) => {
      console.error('Error adding task:', error);
    });
  }
}

