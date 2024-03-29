import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const { databaseURL } = environment.firebase;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

}
