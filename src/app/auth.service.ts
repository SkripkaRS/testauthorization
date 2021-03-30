import { LoginRequest } from './login-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuth: boolean = false;
  userEmail: string = 'test@test';
  userPassword: string = 'test';

  constructor() {}

  logout() {
    this.isAuth = false;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  login(user: LoginRequest): Observable<any> {
    return new Observable((observer) => {
      if (
        user.email === this.userEmail &&
        user.password === this.userPassword
      ) {
        this.isAuth = true;
        observer.next();
        observer.complete();
      } else observer.error('Невірний email або пароль');
    });
  }
}
