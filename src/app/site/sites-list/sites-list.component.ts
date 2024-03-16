import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Site } from 'src/app/types/site';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit{
  sites: Site[] | null = null;

  constructor(private api: ApiService) {} 

  ngOnInit(): void {
    this.api.getSites().subscribe((sites) => {
      this.sites = sites;      
    })
  }

}
