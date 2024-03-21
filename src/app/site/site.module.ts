import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesListComponent } from './sites-list/sites-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddSiteComponent } from './add-site/add-site.component';
import { SiteRoutingModule } from './site-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SitesListComponent,
    AddSiteComponent
  ],
  imports: [
    CommonModule, SiteRoutingModule, HttpClientModule, FormsModule
  ],
  exports: [SitesListComponent]
})
export class SiteModule { }
