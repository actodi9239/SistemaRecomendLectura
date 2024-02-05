import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userEditorForm: FormGroup;
  public isEnabled;
  public isLoading: boolean;
  public textButtom: string;
  public textHeader: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.userEditorForm = this.formBuilder.group({
      userName: [''],
      firstName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\ ñÑ]+')]],
      lastName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\ ñÑ]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,3}$')]],
      nickName: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])[A-Za-z\\d \-\ \'\!$%@#£.,ñÑ""~`€*?& <>]{1,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],

    }, { validator: this.passwordMatchValidator("password", "confirmPassword") });
  }

  addUser() {
    var user = this.userEditorForm.value;
    user.isEnabled = this.isEnabled;
    this.isLoading = true;
    this.sendUserData(user);
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  sendUserData(user) {
    this.userService.addUser(user).subscribe(() => {
      this.toastrService.show('Usuario registrado', 'Éxito');
      this.buildForm();
      this.isLoading = false;
      this.router.navigate(['login']);
    },
      error => {
        this.toastrService.danger(error.error.message, 'Error');
        this.isLoading = false;
      });
  }

  get userName() {
    return this.userEditorForm.get('userName');
  }

  get firstName() {
    return this.userEditorForm.get('firstName');
  }

  get nickName() {
    return this.userEditorForm.get('nickName');
  }

  get lastName() {
    return this.userEditorForm.get('lastName');
  }

  get email() {
    return this.userEditorForm.get('email');
  }

  get password() {
    return this.userEditorForm.get('password');
  }

  get confirmPassword() {
    return this.userEditorForm.get('confirmPassword');
  }
}
