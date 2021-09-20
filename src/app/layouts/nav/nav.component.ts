import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { OrderService } from '@app/core';
import { ShoppingCart } from '@app/core/models/shoppingCart.model';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public loading = true;
  public shoppingCartItemsNumber: number = 0;

  public user$: Observable<User>;
  public isAuthenticated$: Observable<boolean>;
  public shoppingCart$: Observable<ShoppingCart[]>;
  
  @Output() sidenavToggled = new EventEmitter();
  
  private unsubscribe$ = new Subject<void>();
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$.pipe(takeUntil(this.unsubscribe$));
    this.user$ = this.authService.user$.pipe(takeUntil(this.unsubscribe$));
    this.shoppingCart$ = this.orderService.cart$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(x => this.shoppingCartItemsNumber = x.length),
      );
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe();
    this.shoppingCart$.subscribe();
    this.user$.subscribe();
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  toggleSidenav(): void  {
    this.sidenavToggled.emit()
  }

}
