import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public isLoading: Boolean;
  @ViewChild('userFocus', { static: true }) usernameField: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.isLoading = false;
    this.usernameField.nativeElement.focus();
  }

  login() {
    this.isLoading = true;
    var login = this.loginForm.value;

    this.auth.login(login.username, login.password).subscribe(
      () => {
        this.router.navigate(['']);
        this.isLoading = false;
      },
      error => {
        this.errorMessage = error.error.error.message;
        this.isLoading = false;
      }
    );
  }

  register(){
    this.ngZone.run(() => this.router.navigate(['/users/add-user'])).then();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
