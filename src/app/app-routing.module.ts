import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesListComponent } from './site/sites-list/sites-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
