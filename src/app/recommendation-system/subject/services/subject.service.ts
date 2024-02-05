import { Injectable } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectDatastoreService } from './subject-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private subjectDataStoreService : SubjectDatastoreService) { }

  public listSubjects(){
    return this.subjectDataStoreService.all();
  }

  public findSubjectById(id){
    return this.subjectDataStoreService.get(id);
  }

  public addSubject(subject){
    let newSubject = this.subjectDataStoreService.new();
    newSubject.attributes.name = subject.name;
    newSubject.attributes.docente = subject.docente;

    return newSubject.save();
  }

  public updateSubject(subjectToEdit: Subject, subject){
    subjectToEdit.attributes.name = subject.name;
    subjectToEdit.attributes.docente = subject.docente;

    return subjectToEdit.save();
  }
}
