import { Router } from '@angular/router';
import { LoginRequest } from './../login-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string;
  submitted: boolean = false;
  uSub: Subscription;
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: LoginRequest = this.form.value

    this.uSub = this.authService.login(user).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['home']);
        this.submitted = false;
        this.form.reset();
      },
      (err) => {this.message = err;
        this.submitted = false;}
    );
  }

  ngOnDestroy() {
    if (this.uSub != null) {
      this.uSub.unsubscribe();
    }
  }
}
