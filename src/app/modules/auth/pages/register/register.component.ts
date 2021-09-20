import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Subject } from 'rxjs';
import { catchError, skipWhile, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public hide = true;
  public error: string;
  public registerForm: FormGroup;
  
  public errorMatcher = new ErrorStateMatcher();
  private unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { this.buildForm() }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  register() {
    this.authService.register(this.registerForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        skipWhile(ok => ok === false),
        tap(() => this.router.navigate(['/shop'])),
        catchError(error => this.error = error.message),
      ).subscribe();
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: FormGroup):  ValidationErrors | null => { 
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value
    return password === confirmPassword ? null : { notSame: true }
  }

}
