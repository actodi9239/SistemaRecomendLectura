import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/authentication/models/user';
import { GridOptions } from 'ag-grid-community';
import { RoleDatastoreService } from 'src/app/authentication/services/role-datastore.service';
import { UserService } from 'src/app/authentication/services/user.service';
import { Router } from '@angular/router';
import { IconRendererComponent } from 'src/app/recommendation-system/components/icon-renderer/icon-renderer.component';
import { RolesEnum } from 'src/app/models/Enum/roles-ids-enums';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  public users: User[] = [];
  public columnDefs;
  public gridOptions: GridOptions;
  public frameworkComponents: any;
  public roles: string;
  public rolesNames: string = '';
  public isLoading: boolean;
  public adminRole = RolesEnum.ADMIN;
  public moderatorRole = RolesEnum.MODERATOR;
  public studentsRole = RolesEnum.STUDENTS;
  public admin; moderator; student;

  constructor(
    private roleDatastoreService: RoleDatastoreService,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    }
    this.listUsers();
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
        valueFormatter: (params) => { return params.value['given-name']; },
        minWidth: 200
      },
      {
        headerName: 'Usuario',
        field: 'attributes',
        valueFormatter: (params) => { return params.value['given-name']; },
        minWidth: 200
      },
      {
        headerName: 'Email',
        field: 'attributes',
        valueFormatter: (params) => { return params.value.email; },
        minWidth: 200
      },
      {
        headerName: 'Estado',
        field: 'attributes',
        valueFormatter: (params) => { return params.value['is-enabled'] ? 'Activo' : 'Inactivo'; },
        width: 80
      },
      {
        headerName: 'Roles',
        field: 'relationships',
        valueFormatter: (params) => { return this.getRoles(params.value.roles.data); },
        minWidth: 200
      },
      {
        cellRenderer: 'iconRenderer',
        cellRendererParams: {
          onClick: this.sendEmployeeId.bind(this),
          label: 'edit-2-outline',
          tooltip: 'Edit',
          condition: 'No'
        },
        width: 50
      }
    ];
  }

  listUsers(){
    this.userService.listUsers({'roles': this.rolesNames}).subscribe(users => {
      this.users = users.data;
      if (!users.is_loading) {
        this.isLoading = false;
      }
    });
  }

  rolesValueChange(type, value) {
    var valueToSet = type == 'Admin' ? 'Admin' : type == 'Moderator' ? 'Moderator' : 'Student';
    if (value) {
      if (!this.rolesNames.includes(valueToSet)) {
        this.rolesNames += ',' + valueToSet;
      }
    }
    else {
      if (this.rolesNames.includes(valueToSet)) {
        this.rolesNames = this.rolesNames.replace(valueToSet, '');
      }
    }
    this.rolesNames = this.rolesNames.replace(/(^,)|(,$)/g, '');
    this.listUsers();
  }

  getRoles(roles) {
    this.roles = '';
    roles.forEach(role => {
      this.roles = this.roles + ", " + role.id;
    });
    this.roles = this.roles.replace(/(^,)|(,$)/g, '');

    return this.roles;
  }

  sendEmployeeId(e) {
    this.ngZone.run(() => this.router.navigate(['/users/edit-user', e.rowData.id])).then();;
  }
}
