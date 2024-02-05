import { Injectable } from '@angular/core';
import { Autoregister, Service } from 'ngx-jsonapi';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class RoleDatastoreService extends Service<Role>{
  public resource = Role;
  public type = 'roles';
}
