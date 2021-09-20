import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountMenuComponent } from './components/account-menu/account-menu.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      MaterialModule,
      FlexLayoutModule,
    ],
    declarations: [
      SpinnerComponent,
      AccountMenuComponent,
    ],
    exports: [
      CommonModule,
      RouterModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,

      MaterialModule,
      FlexLayoutModule,
      NgbModule,

      SpinnerComponent,
      AccountMenuComponent,
    ]
})
export class SharedModule { }
