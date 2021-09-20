import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Token } from '../models';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    // if(!(req.headers.get('Content-Type'))) {
    //   req = req.clone({
    //     setHeaders: {
    //       'Content-Type' : 'application/json; charset=utf-8',
    //       'Accept'       : 'application/json',
    //       'Authorization': `Bearer ${Token.Create().token}`,
    //     },
    //   });
    //   return next.handle(req);
    // }
    
    // req = req.clone({
    //   setHeaders: {
    //     // 'Content-Type' : undefined,
    //     // 'Accept'       : '*/*',
    //     // 'Connection': 'keep-alive',
    //     'Authorization': `Bearer ${Token.Create().token}`,
    //   },
    // });

    return next.handle(req);
  }
}