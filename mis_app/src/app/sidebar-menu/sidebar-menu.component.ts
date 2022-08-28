import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/authservice.service';
import { User } from './../model/user';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  public readonly isLockedControl = new FormControl();
  public isLocked = false;


  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {
    this.isLockedControl.valueChanges
      .subscribe((isLocked: boolean) => this.isLocked = isLocked);

  }

  logOut() {
    this.authService.logout();
    this.onChanged.emit(false);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }




}
