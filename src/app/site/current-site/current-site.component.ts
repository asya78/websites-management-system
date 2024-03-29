import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../site.service';
import { NgForm } from '@angular/forms';
import { Site } from 'src/app/types/site';

@Component({
  selector: 'app-current-site',
  templateUrl: './current-site.component.html',
  styleUrls: ['./current-site.component.css']
})
export class CurrentSiteComponent implements OnInit {
  siteId: string | null = null;
  site: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.siteId = this.route.snapshot.paramMap.get('id');
    this.getSiteData(this.siteId);
  }

  getSiteData(siteId: string | null): void {
    if (siteId) {
      this.siteService.getSiteByIndex(siteId).subscribe(site => {
        if (site) {
          this.site = site;
        } else {
          console.error(`Task with index ${siteId} not found.`);
        }
      }, error => {
        console.error('Error getting task:', error);
      });
      
    } else {
      console.error('Task ID not provided.');
    }
  }

  updateSite(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }    
    const site: Site = {
      siteName: form.value.siteName,
      siteImg: form.value.siteImg,
      siteProdLink: form.value.siteProdLink,
      siteDevLink: form.value.siteDevLink,
      siteDevelopers: form.value.siteDevelopers,
      siteTasks: form.value.siteTasks
    };   
    
    this.siteService.updateSite(this.siteId, site);
    this.router.navigate(['sites']);
  }
}