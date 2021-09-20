import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class Product {
  constructor(
    public _id: string,
    public title: string,
    public category : string,
    public available: boolean,
    public price: number,
    public imageUrl: string,
    public short: string,
    public description?: string | '',
    public spec?: string | '',
    public seen?: number | null
  ){}
  
}
