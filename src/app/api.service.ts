import { Injectable, OnInit } from '@angular/core';
import { Site } from './types/site';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSites() {
    const { databaseURL } = environment.firebase;

    return this.http.get<Site[]>(`${databaseURL}/site.json`);
  }

}
