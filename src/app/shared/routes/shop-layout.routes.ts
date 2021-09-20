import { Routes } from '@angular/router';
import { CartComponent } from '@app/modules/web-shop/pages/cart/cart.component';
import { ProductComponent } from '@app/modules/web-shop/pages/product/product.component';
import { ShopComponent } from '@app/modules/web-shop/pages/shop/shop.component';

export const CONTENT_ROUTES_SHOP: Routes = [
    { path: 'products', component: ShopComponent },
    { path: 'products/:id', component: ProductComponent },
    { path: 'cart', component: CartComponent}
];