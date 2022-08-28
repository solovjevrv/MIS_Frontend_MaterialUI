import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from './services/authservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public isLogged: any;
  title = 'app';
  constructor(private authService: AuthService) { };
  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn();
  }
  onChanged(increased: any) {
    increased == true ? this.isLogged = true : this.isLogged = false;
  }
}