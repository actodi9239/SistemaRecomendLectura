import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string;
  public userId;
  public user = true;
  public login;

  constructor(
    private sidebarService: NbSidebarService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userService.findById(this.userId).subscribe(username =>{
      this.username = username.attributes["given-name"];
    });
    this.login = this.userId == undefined || this.userId == null  ? false : true;
    this.user = this.authService.getRoles().includes('Admin');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");

    return false;
  }

  changePassword() {
    this.router.navigate(['/change-password', this.userId]);
  }

  editProfile() {
    this.router.navigate(['/edit-profile', this.userId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}