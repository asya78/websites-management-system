import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Task } from 'src/app/types/task';
import { TaskService } from '../task.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit {
  tasks: any;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  getKeyOfCurrentTask(index: number): string {
    return this.tasks[index].key;
  }

}




