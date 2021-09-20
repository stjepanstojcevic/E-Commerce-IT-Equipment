import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, OrderService, ShopService, User } from '@app/core';
import { Product } from '@app/core/models/product.model';

import { from, Observable, Subject } from 'rxjs';
import { map, takeUntil, switchMap, tap, skipWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public loading = true;
  public product: Product;
  
  public user$: Observable<User>;
  private productId: string;
  public product$: Observable<Product>;
  public category$: Observable<string[]> = from(new Array(10).fill("category"));

  private unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public shopService: ShopService,
    private orderService: OrderService,
  ) { 
    this.user$ = this.authService.user$.pipe(takeUntil(this.unsubscribe$));
    this.product$ = this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => params["id"]),
        tap(id => this.productId = id),
        switchMap(id => this.shopService.getProduct(id)),
        map(res => res.data as Product),
        tap(product => product.imageUrl = product.imageUrl + `?${Date.now()}`)
      );
  }

  ngOnInit(): void {
    this.user$.subscribe();
    this.product$.subscribe(product => {
      this.product = product;
      this.loading = false
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public deleteProduct(): void {
    this.shopService.deleteProduct(this.productId)
      .pipe(
        takeUntil(this.unsubscribe$),
        skipWhile(ok => ok === false),
        tap(() => this.router.navigate(['/shop/products']))
      ).subscribe();
  }

  public addProduct() {
    console.log("ProductCardComponent");
    
    this.orderService.addProduct(this.product);
  }
}




//     this.product$ = this.productId$
//       .pipe(
//         takeUntil(this.unsubscribe$),
//         switchMap(id => this.shopService.getProduct(id)),
//         map(res => res.data),
//         tap(product => this.fillForm(product)),
//         tap(product => this.loadImage(product))
//       );