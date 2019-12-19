import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { EcommerceService } from './services/EcommerceService';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CartComponent,
    ProductsComponent,
    ShoppingCartComponent,
    OrdersComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [CartComponent],
  entryComponents: [CartComponent]
})
export class CartModule { }
