import { Injectable } from '@angular/core';

import { User } from '@core/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from '.';
import { Identity, Token } from '../models/token.model';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export class LoginContext {
  email: string;
  password: string;
  remember: boolean = false;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public role$ = new BehaviorSubject<string>("user");
  public user$ = new BehaviorSubject<User>(null);

  constructor(private apiService: ApiService) { }
  
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    //alert(`${error.status} ${error.message}`);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    } return throwError('Something bad happened; please try again later.');
  };

  register(credentials: LoginContext): Observable<boolean> {
    return this.apiService.post('/account/register', credentials)
      .pipe(
        tap(response => Token.Create2(response.token).Save()),
        switchMap(() => this.fetch())
      );
  }

  login(credentials: LoginContext): Observable<boolean> {
    return this.apiService.post("/account/login", credentials)
      .pipe(
        tap(response => Token.Create2(response.token).Save()),
        switchMap(() => this.fetch())
      );
  }

  public logout(): Observable<boolean> {
    Token.Remove();
    this.user$.next(null);
    this.role$.next('user');
    this.isAuthenticated$.next(false);
    return of(true);
  }

  getUserInfo(token: string): Observable<any> {
    return this.apiService.get("/account/userinfo", token);
  }

  public fetch(): Observable<boolean> {
    return this.isLoggedIn()
        .pipe(
          filter(x => x !== null),
          tap(identity => {
            this.isAuthenticated$.next(!!identity);
            this.role$.next(identity.role);
          }),
          switchMap(identity => this.getUserInfo(identity.token)),
          map(x => x.user),
          tap(
            user => this.user$.next(user),
            error => this.handleErrorFetch(error),
            () => console.log("isLoggedIn completed")
          ),
          map(x => !!x)
        );
  }

  public isLoggedIn(): Observable<Identity> {
    const token = Token.Create();
    if (token && token.IsValid()) {
      return of(token.Parse() as Identity)
    }  
    return of(null);
  }

  private handleErrorFetch(error){
    console.log(error);
  }

  
}
