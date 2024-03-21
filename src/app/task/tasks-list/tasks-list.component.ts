import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit{
  tasks: Task[] | null = null;

  constructor(private api: ApiService) {} 

  ngOnInit(): void {
    this.api.getTasks().subscribe((tasks) => {
      this.tasks = tasks;      
    })
  }

}

