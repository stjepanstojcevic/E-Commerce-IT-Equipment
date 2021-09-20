import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new TypeError(`CoreModule is imported twice.`)
    }
  }
}
