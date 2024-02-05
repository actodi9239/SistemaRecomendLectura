import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-recommendation-system',
  templateUrl: './recommendation-system.component.html',
  styleUrls: ['./recommendation-system.component.scss']
})
export class RecommendationSystemComponent implements OnInit {
  menu = this.menuService.getMenu();
  public user = true;

  constructor(private menuService: MenuService,
    private authService: AuthService,) { }
  ngOnInit() {
    this.user = this.authService.getRoles().includes('Admin');
  }


}
