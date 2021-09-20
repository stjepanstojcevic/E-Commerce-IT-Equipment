import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '..';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    
    private role = 'user';
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        this.authService.role$.subscribe(role => this.role = role);
        this.authService.isAuthenticated$.subscribe(loggedIn => this.isAuthenticated = loggedIn);
    }

    canActivate(): boolean {
        if (!this.isAuthenticated) {
            this.router.navigate(['account/login']);
            return false;
        }

        if (this.role !== 'admin') {
            this.router.navigate(['shop/products']);
            return false;
        }

        return true;
    }

}
