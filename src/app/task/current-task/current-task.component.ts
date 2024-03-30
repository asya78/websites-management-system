import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.css']
})
export class CurrentTaskComponent implements OnInit {
  taskId: any;
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      this.getTaskData(this.taskId);
    });
  }

  getTaskData(taskId: string | null): void {
    if (taskId) {
      this.taskService.getTaskByKey(taskId).subscribe(task => {
        if (task) {
          this.task = task;
        } else {
          console.error(`Task with key ${taskId} not found.`);
        }
      }, error => {
        console.error('Error getting task:', error);
      });
    } else {
      console.error('Task ID not provided.');
    }
  }

  updateTask(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }

    const updatedTask: Task = {
      id: this.taskId,
      taskDate: form.value.taskDate,
      taskDevelopers: form.value.taskDevelopers,
      taskImg: form.value.taskImg,
      taskLink: form.value.taskLink,
      taskName: form.value.taskName,
      taskSite: form.value.taskSite,
    };

    this.taskService.updateTask(this.taskId, updatedTask).then(() => {
      console.log('Task updated successfully!');
      this.router.navigate(['tasks']);
    }).catch((error: any) => {
      console.error('Error updating task:', error);
    });
  }
}
