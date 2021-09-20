import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, ShopService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ECommerce';

  private subscription1$: Subscription;
  private subscription2$: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shopService: ShopService,
    ) {
    // if(this.router.url == "/") {
    //   this.router.navigate(["/shop/products"]);
    // }
  }
  ngOnInit(): void {
    this.subscription1$ = this.authService.fetch().subscribe();
    this.subscription2$ = this.shopService.fetch().subscribe();
  }
  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
