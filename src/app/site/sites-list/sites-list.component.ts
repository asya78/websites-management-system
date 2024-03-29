import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Site } from 'src/app/types/site';
import { UserService } from 'src/app/user/user.service';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit {
  sites: Site[] | null = null;

  constructor(
    private siteService: SiteService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.siteService.getSites().subscribe((sites) => {
      this.sites = sites;
    })
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

}
