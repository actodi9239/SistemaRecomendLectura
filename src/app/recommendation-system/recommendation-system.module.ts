import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationSystemRoutingModule } from './recommendation-system-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RecommendationSystemComponent } from './recommendation-system.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { SubjectModule } from './subject/subject.module';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DocumentModule } from './document/document.module';
import { UsersModule } from './users/users.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RedirectToDocumentComponent } from './components/redirect-to-document/redirect-to-document.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecommendationSystemComponent, HeaderComponent, HomeComponent, IconRendererComponent, ConfirmationModalComponent, RedirectToDocumentComponent],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    SubjectModule,
    DocumentModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbCardModule,
    NbLayoutModule,
    UsersModule,
    CommonModule,
    NbCardModule,
    NbSpinnerModule,
    NbEvaIconsModule,
    NbIconModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    NgbModule,
    AppRoutingModule,
    RecommendationSystemRoutingModule
  ]
})
export class RecommendationSystemModule { }
