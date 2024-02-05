import { Injectable } from '@angular/core';
import { Service, Autoregister } from 'ngx-jsonapi';
import { Subject } from 'src/app/models/subject';

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class SubjectDatastoreService  extends Service<Subject>{
   public resource = Subject;
   public type = 'subject';
}
