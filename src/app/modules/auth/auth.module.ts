import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from './auth.routing';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class AuthModule { }
