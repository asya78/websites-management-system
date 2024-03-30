import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SiteService } from '../site.service';
import { Router } from '@angular/router';
import { Site } from 'src/app/types/site';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {

  constructor(
    private db: AngularFireDatabase,
    private siteService: SiteService,
    public router: Router
  ) { }

  addSite(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const site: Site = {
      id: '',
      siteName: form.value.siteName,
      siteImg: form.value.siteImg,
      siteProdLink: form.value.siteProdLink,
      siteDevLink: form.value.siteDevLink,
      siteDevelopers: form.value.siteDevelopers,
      siteTasks: form.value.siteTasks
    };

    this.siteService.addSite(site).then(() => {
      console.log('Site added successfully!');
      this.router.navigate(['sites']);
    }).catch((error: any) => {
      console.error('Error adding site:', error);
    });
  }

}
