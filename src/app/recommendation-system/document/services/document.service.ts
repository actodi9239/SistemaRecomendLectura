import { Injectable } from '@angular/core';
import { Documents } from 'src/app/models/document';
import { Subject } from 'src/app/models/subject';
import { DocumentDatastoreService } from './document-datastore.service'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private documentDatastoreService: DocumentDatastoreService) { }

  public addDocument(document, subject: Subject) {
    let newDocument = this.documentDatastoreService.new();
    newDocument.attributes.name = document.name;
    newDocument.attributes.description = document.description;
    newDocument.attributes.link = document.thumbnailUrl == undefined ? document.link : document.thumbnailUrl;
    newDocument.attributes.semester = parseInt(document.semester);
    newDocument.attributes["document-status"] = document.documentStatus;
    newDocument.attributes.linkImage = document.thumbnailUrlImage;

    newDocument.addRelationship(subject, 'subject');

    return newDocument.save({ include: ['subject'] });
  }

  public updateDocumentStatus(document: Documents) {
    document.addRelationship(document.relationships.subject.data, 'subject');

    return document.save({ include: ['subject'] });
  }

  public listSuggestions() {
    return this.documentDatastoreService.all({ beforepath : 'document/suggestions' });
  }

  public listDocuments(value: string, semester, subject) {
    return this.documentDatastoreService.all({
      remotefilter: {
        'search': value,
        'semester': semester,
        'subject': subject
      }
    });
  }

  public findDocumentById(id) {
    return this.documentDatastoreService.get(id);
  }

  public deleteDocument(id) {
    return this.documentDatastoreService.delete(id);
  }
}