import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { GridOptions } from 'ag-grid-community';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { IconRendererComponent } from 'src/app/recommendation-system/components/icon-renderer/icon-renderer.component';
import { DocumentService } from '../../services/document.service';
import { Documents } from 'src/app/models/document';
import { SubjectDatastoreService } from 'src/app/recommendation-system/subject/services/subject-datastore.service';
import { ConfirmationModalComponent } from 'src/app/recommendation-system/components/confirmation-modal/confirmation-modal.component';
import { UploadService } from 'src/app/services/upload.service';
import { DocumentStatusEnum } from 'src/app/models/Enum/document-status-enum';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  public documents: Documents[] = [];
  public isLoading: boolean;
  public searchIsEmpty: boolean = true;
  public gridOptions: GridOptions;
  public frameworkComponents: any;
  public modalOptions: NgbModalOptions;
  public columnDefs;
  public folderName: string = "documents";
  public approvedDocument = DocumentStatusEnum.APPROVED;

  constructor(
    private documentService: DocumentService,
    private subjectDatastoreService: SubjectDatastoreService,
    private modalService: NgbModal,
    private router: Router,
    private ngZone: NgZone,
    private toastrService: NbToastrService,
    private uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'sm',
      centered: true
    }
    this.isLoading = true;
    this.documentService.listSuggestions().subscribe(documents => {
      if (!documents.is_loading) {
        this.isLoading = false;
        this.documents = documents.data;
      }
    });
    this.loadData();
  }

  loadData() {
    this.gridOptions = {
      domLayout: 'autoHeight',
      pagination: true,
      paginationPageSize: 20,
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        params.api.collapseAll();
      },
      onGridSizeChanged: (params) => {
        params.api.collapseAll();
      }
    }

    this.columnDefs = [
      {
        headerName: 'Nombre',
        field: 'attributes',
        valueFormatter: (params) => { return params.value.name != null ? params.value.name : ""; },
        minWidth: 250
      },
      {
        headerName: 'Descripción',
        field: 'attributes',
        valueFormatter: (params) => { return params.value.description != null ? params.value.description : ""; },
        minWidth: 250
      },
      {
        headerName: 'Materia',
        field: 'relationships',
        valueFormatter: (params) => { return params.value.subject.data.attributes.name != null ? params.value.subject.data.attributes.name : ""; },
        minWidth: 250
      },
      {
        headerName: 'Docente',
        field: 'relationships',
        valueFormatter: (params) => { return params.value.subject.data.attributes.docente != null ? params.value.subject.data.attributes.docente : ""; },
        minWidth: 250
      },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.viewDocument.bind(this),
          label: 'eye-outline',
          tooltip: 'view-document'
        },
        width: 60,
        minWidth: 60
      },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.aprobeDocument.bind(this),
          label: 'checkmark-circle-outline',
          tooltip: 'Aprobar'
        },
        width: 60,
        minWidth: 60
      },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.deleteDocument.bind(this),
          label: 'trash-2-outline',
          tooltip: 'Eliminar'
        },
        width: 60,
        minWidth: 60
      }
    ];
  }


  deleteDocument(e): void {
    var imageUrl = e.rowData.attributes.linkImage;
    var fileUrl = e.rowData.attributes.link;
    const modalRef = this.modalService.open(ConfirmationModalComponent, this.modalOptions);
    modalRef.componentInstance.message = `¿Está seguro de eliminar la sugerencia ${e.rowData.attributes.name}?`;
    modalRef.componentInstance.title = "Eliminar sugerencia";
    modalRef.result.then((result) => {
      if (result) {
        var documents = this.documents.find(p => p.id == e.rowData.id);
        var index = this.documents.indexOf(documents);

        if (index > -1) {
          this.documents.splice(index, 1);
          this.documentService.deleteDocument(documents.id).subscribe(() => {
            this.toastrService.show('Sugerencia Eliminada.', 'Éxito');
            this.gridOptions.api.setRowData(this.documents);
            this.isLoading = false;
          },
            error => {
              this.toastrService.danger(error.error.message, 'Error')
              this.isLoading = false;
            });;
        }
        if (imageUrl) {
          this.uploadService.deleteFile(imageUrl, this.folderName);
        }if (fileUrl) {
          this.uploadService.deleteFile(fileUrl, this.folderName);
        }
      }
    });
  }

  aprobeDocument(e){
    const modalRef = this.modalService.open(ConfirmationModalComponent, this.modalOptions);
    modalRef.componentInstance.message = `¿Está seguro de aprobar la sugerencia ${e.rowData.attributes.name}?`;
    modalRef.componentInstance.title = "Aprobar sugerencia";
    modalRef.result.then((result) => {
      if (result) {
        var documents = this.documents.find(p => p.id == e.rowData.id);
        var index = this.documents.indexOf(documents);

        if (index > -1) {
          this.documents.splice(index, 1);
          documents.attributes["document-status"] = this.approvedDocument;
          this.documentService.updateDocumentStatus(documents).subscribe(() => {
            this.toastrService.show('Sugerencia Aprobada.', 'Éxito');
            this.gridOptions.api.setRowData(this.documents);
            this.isLoading = false;
          },
            error => {
              this.toastrService.danger(error.error.message, 'Error')
              this.isLoading = false;
            });;
        }
      }
    });
  }
  
  viewDocument(e) {
    window.open(e.rowData.attributes.link);
  }
}
