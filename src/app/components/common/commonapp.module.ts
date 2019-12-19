import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

import { ProductComponent } from './product/product.component';
import { ProductsService } from '../../services/common/products.service';
import { MyBasicService } from '../../services/common/my-basic-service';
import { HttpClient } from '@angular/common/http';
import { CarouselComponent } from './carousel/carousel.component';
import { SectionsService } from '../../services/common/sections.service';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, ProductComponent, CarouselComponent, DetailComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [ProductsService, MyBasicService, SectionsService],
  exports: [HeaderComponent, FooterComponent, HomeComponent, ProductComponent, CarouselComponent, DetailComponent, LoginComponent],
  entryComponents: [HeaderComponent, FooterComponent, HomeComponent, ProductComponent, CarouselComponent, DetailComponent, LoginComponent]
})
export class CommonModuleApp {}
