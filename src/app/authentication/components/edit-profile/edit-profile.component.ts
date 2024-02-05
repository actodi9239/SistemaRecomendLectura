import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { User } from 'src/app/authentication/models/user';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public userEditorForm: FormGroup;
  public user: User;
  public isEnabled;
  public isLoading: boolean;
  public textButtom: string;
  public textHeader: string;

  constructor(
    private userService: UserService,
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

  private buildForm() {
    this.userEditorForm = this.formBuilder.group({
      userName: [''],
      firstName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\]+')]],
      lastName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\]+')]],
      givenName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],

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
              givenName: this.user.attributes["given-name"],
            });
          }
        });
        this.textButtom = "Actualizar";
        this.textHeader = "Editar Perfil";
      } else {
        this.user = null;
        this.textButtom = "Registrar";
        this.textHeader = "Agregar Usuario"
      }
    });
  }

  addUser() {
    var user = this.userEditorForm.value;
    user.isEnabled = this.isEnabled;
    this.isLoading = true;
    this.sendUserData(user);
  }

  sendUserData(user) {
    if (this.user) {
      this.userService.updateUserClient(this.user, user).subscribe(() => {
        this.toastrService.show('Usuario actualizado', 'Éxito');
        this.isLoading = false;
      },
        error => {
          this.toastrService.danger(error.error.message, 'Error');
          this.isLoading = false;
        });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.toastrService.show('Usuario registrado', 'Éxito');
        this.buildForm();
        this.isLoading = false;   
      },
        error => {
          this.toastrService.danger(error.error.message, 'Error');
          this.isLoading = false;
        });
    }
  }

  get userName() {
    return this.userEditorForm.get('userName');
  }

  get firstName() {
    return this.userEditorForm.get('firstName');
  }

  get givenName() {
    return this.userEditorForm.get('givenName');
  }

  get lastName() {
    return this.userEditorForm.get('lastName');
  }
}
