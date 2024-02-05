import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { ViewDocumentComponent } from './components/view-document/view-document.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DocumentService } from './services/document.service';
import { AgGridModule } from 'ag-grid-angular';
import { DocumentDatastoreService } from './services/document-datastore.service';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { IconRendererComponent } from '../components/icon-renderer/icon-renderer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddDocumentLinkComponent } from './components/add-document-link/add-document-link.component';



@NgModule({
  declarations: [AddDocumentComponent, ViewDocumentComponent, AddDocumentLinkComponent],
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
      ViewDocumentComponent
    ]),
    NgbModule,
  ],
  providers: [
    DocumentDatastoreService,
    DocumentService
  ],
  entryComponents: [
    IconRendererComponent,
    ConfirmationModalComponent
  ]
})
export class DocumentModule { }
