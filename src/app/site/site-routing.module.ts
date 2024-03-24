import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSiteComponent } from './add-site/add-site.component';
import { SitesListComponent } from './sites-list/sites-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  // {path: 'sites', children: [
  //   {path: '', pathMatch: 'full', component: SitesListComponent},
  //   {path:':themeId', component: CurrentThemeComponent}
  // ]},
  {path: 'sites', component: SitesListComponent},
  {path: 'add-site', component: AddSiteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
