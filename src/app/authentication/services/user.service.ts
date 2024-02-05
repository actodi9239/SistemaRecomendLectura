import { Injectable } from '@angular/core';
import { UserDatastoreService } from './user-datastore.service';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDatastoreService: UserDatastoreService, private http: HttpClient) { }

  public findUsername(username) {
    return this.userDatastoreService.get(username);
  }

  public findById(id) {
    return this.userDatastoreService.get(id);
  }

  public changePassword(data: User, credentials) {
    data.attributes['old-password'] = credentials.oldPassword;
    data.attributes.password = credentials.password;
    data.attributes['confirm-password'] = credentials.confirmPassword;

    const reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/vnd.api+json' }) };

    return this.http.post<any>(environment.BACK_END_HOST + 'users/changepassword', { data }, reqHeader);
  }

  public listUsers(params) {
    return this.userDatastoreService.all({
      remotefilter: params
    });
  }

  public addUser(user) {
    let newUser = this.userDatastoreService.new();
    newUser.attributes["first-name"] = user.firstName;
    newUser.attributes["last-name"] = user.lastName;
    newUser.attributes["given-name"] = user.nickName;
    newUser.attributes.email = user.email;
    newUser.attributes.password = user.password;
    newUser.attributes["confirm-password"] = user.confirmPassword;

    return newUser.save();
  }

  public updateUserClient(userToEdit: User, user) {
    userToEdit.attributes.username = user.userName;
    userToEdit.attributes["first-name"] = user.firstName;
    userToEdit.attributes["last-name"] = user.lastName;
    userToEdit.attributes["given-name"] = user.givenName;
    userToEdit.attributes["is-enabled"] = user.isEnabled;

    return userToEdit.save();
  }

  public updateUser(userToEdit: User, user) {
    userToEdit.relationships.roles.data = [];
    userToEdit.attributes["is-enabled"] = user.isEnabled;
    userToEdit.addRelationships(user.selectedRoles, 'roles');

    return userToEdit.save({ include: ['roles'] });
  }
}
