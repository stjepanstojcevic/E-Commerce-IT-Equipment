import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '.';
import { Product } from '../models/product.model';
import { ShoppingCart } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  tempItem = new ShoppingCart(new Product("id:12313450348", "title", "PC", true, 456.66, "imageUrl", "short description"))
  public cart$: BehaviorSubject<ShoppingCart[]> = new BehaviorSubject<ShoppingCart[]>([]);

  constructor(private apiService: ApiService) { }

  public addProduct(product: Product): void {
    var shoppingCartList = this.cart$.getValue();

    var foundIndex = shoppingCartList.findIndex(x => x.product._id === product._id);
    if (foundIndex < 0) {
      this.cart$.next(this.cart$.getValue().concat([new ShoppingCart(product)]));
      return;
    }

    shoppingCartList[foundIndex].count += 1;
    this.cart$.next(shoppingCartList);
  }

  public removeProduct(product: Product): void {
    this.cart$.next(this.cart$.getValue().filter(x => x.product._id !== product._id));
  }

  
  public addCount(productIndex: number): void {
    var list = this.cart$.getValue();
    list[productIndex].count += 1;
    this.cart$.next(list);
  }
  public removeCount(productIndex: number): void {
    var list = this.cart$.getValue();
    if (list[productIndex].count === 1) {
      this.removeProduct(list[productIndex].product);
      return;
    }

    list[productIndex].count -= 1;
    this.cart$.next(list);
  }

  public clearCart(): Observable<boolean> {
    this.cart$.next([]); return of(true);
  }

  public submitOrder(): Observable<boolean> {
    return this.apiService.post('/orders', this.cart$.getValue())
      .pipe(
        tap(() => this.cart$.next([])),
        map(x => true)
      );
    
  }
  
}
