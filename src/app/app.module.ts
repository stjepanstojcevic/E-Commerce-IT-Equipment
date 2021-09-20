import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@module/auth/auth.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Layout Components
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from '@layout/nav/nav.component';
import { FooterComponent } from '@layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,

    DefaultLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    // angular
    BrowserModule,
    NgbModule,
    
    // core & shared
    CoreModule,
    AuthModule,
    SharedModule,

    // app
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
