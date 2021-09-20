import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  
  constructor(private apiService: ApiService) { }

  public findProducts(): Observable<Response> {
    return this.apiService.get('/products');
  }

  public getProduct(id: string): Observable<Response> {
    return this.apiService.get('/products/' + id);
  }

  public createOrUpdateProduct(editMode: boolean, productData: any, productId: string = null): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('title', productData.title);
    formData.append('category', productData.category);
    formData.append('short', productData.short);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('available', productData.available);

    if(productData.uploadedImage) formData.append('image', productData.uploadedImage, productData.uploadedImage.name);
    
    if(editMode) {
      return this.apiService.putForm('/products/' + productId, formData)
        .pipe(switchMap(() => this.fetch()));
    }
    return this.apiService.postForm('/products', formData)
      .pipe(switchMap(() => this.fetch()));
  }

  public deleteProduct(id: string): Observable<boolean> {
    return this.apiService.delete('/products/' + id)
      .pipe(switchMap(() => this.fetch()));
  }

  public fetch(): Observable<boolean> {
    return this.findProducts()
      .pipe(
        // tap(res => console.log("shop.service.fetch", res)),
        map(res => res.data),
        tap(products => this.products$.next(products as Product[])),
        map(x => !!x)
      );
  }

  public getCategories(): Observable<string[]> {
    return this.apiService.get('/products/categories').pipe(map(res => res.data), tap(x => console.log(x)));
  }

  public filterByCategory(category: string) {
    return this.apiService.get(`/products?category=${category}`)
      .pipe(
        map(res => res.data),
        tap(products => this.products$.next(products as Product[]))
      );
  }
  
}
