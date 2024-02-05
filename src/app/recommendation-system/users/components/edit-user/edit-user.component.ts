import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Role } from 'src/app/authentication/models/role';
import { User } from 'src/app/authentication/models/user';
import { RoleDatastoreService } from 'src/app/authentication/services/role-datastore.service';
import { UserService } from 'src/app/authentication/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public userEditorForm: FormGroup;
  public user: User;
  public isEnabled;
  public isLoading: boolean;
  public textButtom: string;
  public textHeader: string;
  public userRoles: FormArray;
  public checkedRoles;
  public roles;

  constructor(
    private userService: UserService,    
    private roleDatastoreService: RoleDatastoreService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.buildForm();
    this.buildFormToEdit();
  }

  private buildForm(){
   this.userEditorForm = this.formBuilder.group({
     userName: [''],
     firstName: ['',[Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
     lastName: ['',[Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
     email: ['',[Validators.required, Validators.email]],
     isEnabled: null,
     userRoles: this.formBuilder.array([]),
   });

   this.userRoles = this.userEditorForm.get('userRoles') as FormArray;
    this.roles = environment.ROLES.split(',');
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.roles.forEach(role => {
          this.userRoles.push(this.formBuilder.group({ name: role, selected: false }));
        });
      }
    });
  }

  private buildFormToEdit() {
    this.route.params.subscribe(params => {
      var userId = params['id'];
      if (userId) {
        this.userService.findById(userId).subscribe(user => {
          if (!user.is_loading) {
            this.user = user;
            this.userEditorForm.patchValue({
              userName: this.user.attributes.username,
              firstName: this.user.attributes["first-name"],
              lastName: this.user.attributes["last-name"],
              email: this.user.attributes.email,
              isEnabled: this.user.attributes["is-enabled"]
            });
            this.isEnabled = this.user.attributes["is-enabled"];
            this.checkedRoles = this.user.relationships.roles.data;
            this.roles.forEach(role => {
              this.userRoles.push(this.formBuilder.group({ name: role, selected: this.checkedRoles.find(cr => cr.id == role) ? true : false }));
            });
          }
        });
        this.textButtom = "Guardar";
        this.textHeader = "Editar Usuario";
      } else {
        this.user = null;
        this.textButtom = "Registrar";
        this.textHeader = "Agregar Usuario"
      }
    });
  }

  addUser(){
    var user = this.userEditorForm.value;
    var selectedRoles = [];

    user.isEnabled = this.isEnabled;
    user.userRoles.filter(r => r.selected).forEach(r => {
      var newRole = new Role();
      newRole.id = r.name;
      newRole.attributes.name = r.name;
      newRole.type = 'roles';
      selectedRoles.push(newRole);
    });

    user.selectedRoles = selectedRoles;
    this.isLoading = true;
    this.sendUserData(user);
  }

  sendUserData(user){
    if(this.user){
      this.userService.updateUser(this.user, user).subscribe(() =>{
        this.toastrService.show('Usuario Actualizado', 'Exito');
        this.ngZone.run(()=>this.router.navigate(['/users/view-users']).then());
        this.isLoading = false;
      },
      error => {
        this.toastrService.danger(error.error.message, 'Error');
        this.isLoading = false;
      });
    }
    else{
      this.userService.addUser(user).subscribe(() => {
        this.toastrService.show('Usuario Registrado', 'Exito');
        this.userEditorForm.reset();
        this.buildForm();
        this.isLoading = false;
      },
      error => {
        this.toastrService.danger(error.error.message, 'Error');
        this.isLoading = false;
      });
    }
  }

  get userName(){
    return this.userEditorForm.get('userName');
  }

  get firstName(){
    return this.userEditorForm.get('firstName');
  }

  get lastName(){
    return this.userEditorForm.get('lastName');
  }

  get email(){
    return this.userEditorForm.get('email');
  }
}
