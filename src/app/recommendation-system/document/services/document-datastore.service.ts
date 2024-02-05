import { Injectable } from '@angular/core';
import { Autoregister, Service } from 'ngx-jsonapi';
import { Documents } from 'src/app/models/document';

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class DocumentDatastoreService extends Service<Documents>{
  public resource = Documents;
  public type = 'document';
}