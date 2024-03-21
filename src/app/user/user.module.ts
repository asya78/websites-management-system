import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
