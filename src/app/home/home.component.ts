import { Component, OnInit } from '@angular/core';
import { Site } from '../types/site';
import { ApiService } from '../api.service';
import { Task } from '../types/task';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { SiteService } from '../site/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  sites: Site[] | null = null;
  tasks: Task[] | null = null;

  constructor(
    private api: ApiService, 
    private userService: UserService,
    private taskService: TaskService,
    private siteService: SiteService
    ) {} 

  ngOnInit(): void {
    this.siteService.getSites().subscribe((sites) => {
      this.sites = sites;      
    })

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;      
    })

  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

}