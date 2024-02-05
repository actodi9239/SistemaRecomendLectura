import { Injectable } from '@angular/core';
import { Autoregister, Service } from 'ngx-jsonapi';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class UserDatastoreService extends Service<User>{
  public resource = User;
  public type = 'users';
}
