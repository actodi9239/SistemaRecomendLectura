import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public errorMessage: string;
  public user: User;
  public isLoading: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: NbToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      this.userService.findById(params["id"]).subscribe(user => {
        this.user = user;
      });
    });
  }

  private buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])[A-Za-z\\d \-\ \'\!$%@#£.,ñÑ""~`€*?& <>]{1,}$')]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  changePassword() {
    this.isLoading = true;
    var credentials = this.changePasswordForm.value;

    this.userService.changePassword(this.user, credentials).subscribe(() => {
      this.isLoading = false;
      this.toastr.success('Password changed', 'Success');
      setTimeout(() => { this.authService.logout(); }, 2000);
    }, error => {
      this.errorMessage = error.error.errors ? this.showError(error.error.errors) : error.error.error.message;
      this.isLoading = false;
    });
  }

  showError(error) {
    if (error.ConfirmPassword) {
      return error.ConfirmPassword[0];
    }
    if (error.Password) {
      return error.Password[0];
    }
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
}
