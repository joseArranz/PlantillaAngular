import { Component, OnInit } from "@angular/core";
import { SectionsService } from "../../../services/common/sections.service";
import { LoginService } from '../../../services/common/login.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/common/products.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  sections: any = [];
  isLoggin = false;

  constructor(private sectionsService: SectionsService,
    private loginService: LoginService, private productsService: ProductsService,
    private router: Router) { }

  async ngOnInit() {
    this.sections = await this.sectionsService.getSections();

    this.loginService.isLoggin().subscribe(arg => this.isLoggin = arg);

    console.log(this.sections);
  }

  logOut(event) {

    this.loginService.setLoggin(false);
    this.loginService.cleanSession();
    this.router.navigate(["/home"]);
  }

  searchProducts(event, search) {
   
    this.productsService.loadProducts(search);
    if (this.router.url.includes('/detail')) {
      this.router.navigate(["/home"]);
    }
  }

  searchByCategory(event, section, platform ){
    this.productsService.loadProductsByCategory(section, platform);
    if (this.router.url.includes('/detail')) {
      this.router.navigate(["/home"]);
    }
  }

  loadPage(){
    this.productsService.loadProducts(null);  
  }

}
