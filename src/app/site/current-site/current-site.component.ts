import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../site.service';
import { NgForm } from '@angular/forms';
import { Site } from 'src/app/types/site';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-current-site',
  templateUrl: './current-site.component.html',
  styleUrls: ['./current-site.component.css']
})
export class CurrentSiteComponent implements OnInit {
  siteId: string | null = null;
  site: Site | null = null;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.siteId = params.get('id');
      this.getSiteData(this.siteId);
    });
  }

  getSiteData(siteId: string | null): void {
    if (siteId) {
      this.siteService.getSiteByKey(siteId).subscribe(site => {
        if (site) {
          this.site = site;
        } else {
          console.error(`Site with key ${siteId} not found.`);
        }
      }, (error: any) => {
        console.error('Error getting site:', error);
      });
    } else {
      console.error('Site ID not provided.');
    }
  }

  updateSite(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }

    if (this.site && this.siteId) {
      const updatedSite: Site = {
        id: this.siteId,
        siteName: form.value.siteName,
        siteImg: form.value.siteImg,
        siteProdLink: form.value.siteProdLink,
        siteDevLink: form.value.siteDevLink,
        siteDevelopers: form.value.siteDevelopers,
        siteTasks: form.value.siteTasks
      };

      this.siteService.updateSite(this.siteId, updatedSite).then(() => {
        console.log('Site updated successfully!');
        this.router.navigate(['sites']);
      }).catch((error: any) => {
        console.error('Error updating site:', error);
      });
    }

  }
}