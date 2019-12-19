import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModuleApp } from "./components/common/commonapp.module";
import { LoginService } from "./services/common/login.service";
import { fakeBackendProvider } from "./interceptors/FakeBackendInterceptor ";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanActivateCart } from './components/cart/guards/CanActivateCart';
import { EcommerceService } from './components/cart/services/EcommerceService';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModuleApp, HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [LoginService, fakeBackendProvider, CookieService, CanActivateCart, EcommerceService],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule {}
