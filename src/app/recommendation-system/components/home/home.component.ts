import { ElementRef, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/models/document';
import { DocumentService } from '../../document/services/document.service';
import { SubjectDatastoreService } from '../../subject/services/subject-datastore.service';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { SubjectService } from '../../subject/services/subject.service';
import { DocumentCollection } from 'ngx-jsonapi';
import { Subject } from 'src/app/models/subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLoading: boolean;  
  public searchIsEmpty: boolean = true;
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;
  public documents: Documents[] = [];
  public subject = 0;
  public semester = 0;
  public subjects: DocumentCollection<Subject>;

  constructor(    
    private documentService: DocumentService,
    private subjectDatastoreService: SubjectDatastoreService,
    private subjectService: SubjectService,
    private router: Router,
    private ngZone: NgZone

  ) { }

  ngOnInit() {

    this.subjectService.listSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });

    this.searchProducts('');
    
    fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(1000)
    ).subscribe(text => {
      this.searchProducts(text);
    });
  }

  searchProducts(value: string){    
    this.isLoading = true;
    this.documentService.listDocuments(value, this.semester, this.subject).subscribe(documents => {
      if (!documents.is_loading) {
        this.documents = documents.data;
        this.isLoading = false;
      }
    });

  }

  getDocumentsByStatus() {
    this.isLoading = true;
    this.documentService.listDocuments('', this.semester, this.subject).subscribe(documents => {
      if (!documents.is_loading) {
        this.isLoading = false;
        this.documents = documents.data;
      }
    });
  }

  view(link){
    window.open(link);
  }
}
