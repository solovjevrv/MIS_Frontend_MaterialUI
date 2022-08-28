import { Component, Inject, ChangeDetectionStrategy, EventEmitter, Output, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../model/user';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let userInitial = new User("", "");
    this.userSubject = new BehaviorSubject<User>(userInitial);
    this.user = this.userSubject.asObservable();
  };

  async login(login: string, password: string) {
    let newUser: UserRegister = {
      login: login,
      password: password
    };
    const loginresult = await this.http.post<LoginResultInt>('http://localhost:5268/login', newUser).toPromise();
    localStorage.setItem('access_token', loginresult!.access_token);
    localStorage.setItem('current_username', loginresult!.username);
    localStorage.setItem('current_userpost', loginresult!.userpost);
    let user = new User(loginresult!.username, loginresult!.userpost);
    this.userSubject.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_username");
    localStorage.removeItem("current_userpost");
    this.userSubject.next(new User("", ""));
  }

  public isLoggedIn() {
    let tokenToSend: any = localStorage.getItem('access_token');
    if (tokenToSend) {
      return true;
    }
    else {
      return false;
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getUsername() {
    return localStorage.getItem('current_username');
  }
  getUserpost() {
    return localStorage.getItem('current_userpost');
  }
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