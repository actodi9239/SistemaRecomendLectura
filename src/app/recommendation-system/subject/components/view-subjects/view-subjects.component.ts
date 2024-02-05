import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { GridOptions } from 'ag-grid-community';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { SubjectService } from '../../services/subject.service';
import { IconRendererComponent } from 'src/app/recommendation-system/components/icon-renderer/icon-renderer.component';

@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.scss']
})
export class ViewSubjectsComponent implements OnInit {

  public subjects: Subject[] = [];
  public isLoading: boolean;
  public searchIsEmpty: boolean = true;
  public gridOptions: GridOptions;
  public frameworkComponents: any;
  public modalOptions: NgbModalOptions;
  public columnDefs;

  constructor(
    private subjectService : SubjectService,
    private modalService: NgbModal,
    private router: Router,
    private ngZone: NgZone,
    private toastrService: NbToastrService,
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
    this.subjectService.listSubjects().subscribe(subjects => {
      if (!subjects.is_loading) {
        this.isLoading = false;
        this.subjects = subjects.data;
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
        headerName: 'Docente',
        field: 'attributes',
        valueFormatter: (params) => { return params.value.docente != null ? params.value.docente : ""; },
        minWidth: 250
      },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.sendSubjectId.bind(this),
          label: 'edit-2-outline',
          tooltip: 'Edit'
        },
        width: 60,
        minWidth: 60
      }
    ];
  }

  sendSubjectId(e) {
    this.ngZone.run(() => this.router.navigate(['/subjects/edit-subject', e.rowData.id])).then();;
  }

}
