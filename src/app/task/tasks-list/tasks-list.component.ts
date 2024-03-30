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
  tasks: Task[] | undefined;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map((task, index) => {
        return { ...task, key: index.toString() };
      });
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  deleteTask(key: string) {
    this.taskService.deleteTask(key)
      .then(() => {
        console.log("Task successfully deleted!");
        // Презареждане на списъка с задачи след изтриване
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
        });
      })
      .catch(error => {
        console.error("Error deleting task:", error);
      });
  }

}




