import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbSpinnerModule, NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserDatastoreService } from './services/user-datastore.service';
import { UserService } from './services/user.service';
import { JwtDecodeService } from './services/jwt-decode.service';
import { RoleDatastoreService } from './services/role-datastore.service';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterComponent } from './components/register/register.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent, RegisterComponent, EditProfileComponent],
  imports: [
    NbCardModule,
    NbSpinnerModule,
    NbButtonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NbLayoutModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserDatastoreService,
    UserService,
    JwtDecodeService,
    RoleDatastoreService
  ]
})
export class AuthenticationModule { }
