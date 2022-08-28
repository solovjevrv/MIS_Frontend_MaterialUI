import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { User } from './../model/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],

})
export class TopMenuComponent {
  user: User;
  isExpanded = false;
  currentusername = "";
  currentuserpost = "";
  isMenuOpened = false;

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  };

  logOut() {
    this.authService.logout();
    this.onChanged.emit(false);
  }
  ngOnInit() {
    this.currentusername = this.authService.getUsername()!;
    this.currentuserpost = this.authService.getUserpost()!;
  }


  openMenu() {
    this.isMenuOpened = true;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }


}