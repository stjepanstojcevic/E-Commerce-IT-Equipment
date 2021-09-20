import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit, OnDestroy {

  public role$: Observable<any>;

  private subscribtions$: Subscription[] = [];
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.role$ = this.authService.role$;
  }
  
  ngOnDestroy(): void {
    this.subscribtions$.forEach(sub => sub.unsubscribe());
  }
  
  public logout(): void {
    this.subscribtions$.push(
      this.authService.logout()
        .pipe(tap(() => this.router.navigate(["account/login"])))
        .subscribe());
  }
}
