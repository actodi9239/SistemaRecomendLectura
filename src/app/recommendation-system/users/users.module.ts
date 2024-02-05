import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IconRendererComponent } from '../components/icon-renderer/icon-renderer.component';



@NgModule({
  declarations: [EditUserComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    NbEvaIconsModule,
    NbIconModule,
    AgGridModule.withComponents([
    ViewUsersComponent
    ]),
    AppRoutingModule,
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbThemeModule
  ],
  entryComponents: [
    IconRendererComponent
  ]
})
export class UsersModule { }
