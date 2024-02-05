import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';
import { ViewSubjectsComponent } from './components/view-subjects/view-subjects.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AgGridModule } from 'ag-grid-angular';
import { IconRendererComponent } from '../components/icon-renderer/icon-renderer.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { SubjectService } from './services/subject.service';
import { SubjectDatastoreService } from './services/subject-datastore.service';



@NgModule({
  declarations: [EditSubjectComponent, ViewSubjectsComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    CommonModule,
    AgGridModule.withComponents([
      ViewSubjectsComponent
    ])
  ],
  providers: [
    SubjectService,
    SubjectDatastoreService
  ],
  entryComponents: [
    IconRendererComponent,
    ConfirmationModalComponent,
  ]
})
export class SubjectModule { }
