import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '@app/core';
import { ShoppingCart } from '@app/core/models/shoppingCart.model';
import { Subject } from 'rxjs';

import { skipWhile, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCartComponent } from '../../components/dialog-cart/dialog-cart.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['number', 'title', 'price', 'count'];
  displayedColumnsMobile: string[] = ['title', 'price', 'count'];
  public empty: boolean = true;
  public shoppingCart: ShoppingCart[];
  
  private _mobileQueryListener: () => void;
  private unsubscribe$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef, 
    private orderService: OrderService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit(): void {
    this.orderService.cart$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(x => this.shoppingCart = x))
      .subscribe();

    this.empty = this.shoppingCart.length === 0;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  public getTotal(): number {
    var total = 0;
    this.shoppingCart.forEach(item => {
      total += (item.product.price * item.count)
    })
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  public clearCart(): void {
    this.orderService.clearCart()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(x => console.log(x)),
        tap(() => this.empty = true)
      ).subscribe()
  }
  public submitOrder(): void {
    this.openDialog();
  }

  public addCount(index): void {
    this.orderService.addCount(index);
  }
  public removeCount(index): void {
    this.orderService.removeCount(index);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogCartComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });


    // this.orderService.submitOrder()
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     tap(() => this.router.navigate(['/shop']))
    //   ).subscribe();

    dialogRef.afterClosed()
      .pipe(
        skipWhile(x => x === false),
        takeUntil(this.unsubscribe$),
        switchMap(() => this.orderService.submitOrder()),
        tap(() => this.router.navigate(['/shop']))  
      ).subscribe(() => {
        this.openSnackBar();
      });
  }

  openSnackBar() {
    this.snackBar.open('Order Submited!', "Close", {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000
    });
  }
}
