import { Product } from "./product.model";

export class ShoppingCart {
  constructor(
    public product: Product,
    public count: number = 1,
  ) { }

}