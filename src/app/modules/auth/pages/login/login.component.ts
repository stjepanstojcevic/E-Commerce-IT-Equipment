import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, skipWhile, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public hide = true;
  public error: string;

  public loginForm: FormGroup;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { this.buildForm() }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    this.error = null;
    this.authService.login(this.loginForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        skipWhile(ok => ok === false),
        tap(() => this.router.navigate(['/shop'])),
        catchError(error => this.error = error.message)
      ).subscribe();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

}
