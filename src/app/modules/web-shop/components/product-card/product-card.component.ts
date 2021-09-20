import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, User } from '@app/core';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() user: User;
  @Input() product: Product;
  
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  public addProduct() {
    if (!this.user) {
      this.router.navigate(['account/login']);
    }
    this.orderService.addProduct(this.product);
  }
}
