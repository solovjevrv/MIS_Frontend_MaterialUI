import { Component, Inject, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../model/user';
import { AuthService } from '../services/authservice.service';
import { FormControl, Validators } from '@angular/forms';




// валидация имя пользователя и пароля
// const latinCharsPlusDigits = /^[a-zA-Z0-9]+$/;
// const latinCharsPlusSymbol = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;


// export function passwordValidator(field: AbstractControl): Validators | null {
//   return field.value && latinCharsPlusDigits.test(field.value)
//     ? null
//     : {
//       other: `Пароль не может содержать русские буквы`,
//     };
// }
// export function loginValidator(field: AbstractControl): Validators | null {
//   return field.value && latinCharsPlusSymbol.test(field.value)
//     ? null
//     : {
//       other: `Логин не может содержать русские буквы. \nПример: admin@company.ru`,
//     };
// }


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {

  userAdd: UserToAdd = new UserToAdd("", "");
  currentUser: User = new User("", "");
  logres: LoginResult | undefined;

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) { };

  async submit() {
    localStorage.removeItem('access_token');
    await this.authService.login(this.userAdd.loginToAdd, this.userAdd.passwordToAdd);
    this.onChanged.emit(true);
  };

  getlogin() {
    this.http.get<{ stringRes: string }>('http://localhost:4402/values'/*, { headers: { "Authorization": tokenToSend } }*/
    ).subscribe(result => {
      // localStorage.setItem('access_token', result.access_token);
    }, error => console.error(error));

  };
  getrole() {
    this.http.post<{ stringRes: string }>('http://localhost:4402/values', null).subscribe(result => {
      //localStorage.setItem('access_token', result.access_token);
    }, error => console.error(error));

  };

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Введите логин';
    }

    return this.email.hasError('email') ? 'Логин не может содержать русские буквы. \nПример: admin@company.ru' : '';
  }
  hide = true;
}

export class UserToAdd {
  constructor(
    public loginToAdd: string,
    public passwordToAdd: string,
  ) { }

}

interface UserRegister {
  login: string;
  password: string;
}

interface LoginResultInt {
  access_token: string;
  username: string;
  userpost: string;
}

export class LoginResult {
  constructor(public access_token: string, public username: string, public userpost: string) { }
}