import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { WebShopRoutingModule } from './web-shop.routing';

import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { DialogCartComponent } from './components/dialog-cart/dialog-cart.component';

@NgModule({
  declarations: [
    ShopComponent,
    ProductComponent,

    ProductCardComponent,
    ShoppingCartComponent,
    CartComponent,
    DialogCartComponent
  ],
  imports: [
    WebShopRoutingModule,
    SharedModule
  ],
})
export class WebShopModule { }
