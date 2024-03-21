import { Injectable, OnInit } from '@angular/core';
import { Site } from './types/site';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from './types/task';

const { databaseURL } = environment.firebase;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSites() {
    return this.http.get<Site[]>(`${databaseURL}/site.json`);
  }

  getTasks() {
    return this.http.get<Task[]>(`${databaseURL}/task.json`);
  }

}
