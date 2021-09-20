import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, ShopService, User } from '@app/core';
import { Product } from '@app/core/models/product.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  public empty: boolean = false;
  public user$: Observable<User>;
  public products$: Observable<Product[]>;
  public categories$: Observable<string[]>;
  
  private unsubscribe$ = new Subject<void>();
  constructor(
    private authService: AuthService,
    private shopService: ShopService,
  ) { 
    this.user$ = this.authService.user$.pipe(takeUntil(this.unsubscribe$));
    this.products$ = this.shopService.products$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(list => this.isEmpty(list.length)),
        tap(list => list.forEach(x => x.imageUrl = x.imageUrl + `?${Date.now()}`))
      );
    this.categories$ = this.shopService.getCategories().pipe(takeUntil(this.unsubscribe$));
  }
  
  ngOnInit(): void { 
    this.user$.subscribe();
    this.products$.subscribe();
    this.categories$.subscribe();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  public filterByCategory(category: string): void {
    this.shopService.filterByCategory(category)
      .pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  public resetFilter(): void {
    this.shopService.fetch().pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  private isEmpty(lenght){
    this.empty = lenght === 0;
  }
}
