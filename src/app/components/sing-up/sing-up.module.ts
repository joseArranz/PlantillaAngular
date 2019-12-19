import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingUpRoutingModule } from './sing-up-routing.module';
import { SingUpComponent } from './sing-up.component';

@NgModule({
  declarations: [SingUpComponent],
  imports: [
    CommonModule,
    SingUpRoutingModule
  ]
})
export class SingUpModule { }
