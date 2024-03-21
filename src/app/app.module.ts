import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SiteModule } from './site/site.module';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { TaskModule } from './task/task.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    UserModule,
    SiteModule,
    TaskModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
