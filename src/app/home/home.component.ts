import { Component, OnInit } from '@angular/core';
import { Site } from '../types/site';
import { ApiService } from '../api.service';
import { Task } from '../types/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  sites: Site[] | null = null;
  tasks: Task[] | null = null;

  constructor(private api: ApiService) {} 

  ngOnInit(): void {
    this.api.getSites().subscribe((sites) => {
      this.sites = sites;      
    })

    this.api.getTasks().subscribe((tasks) => {
      this.tasks = tasks;      
    })
  }

}