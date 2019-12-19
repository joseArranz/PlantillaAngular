import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../services/common/products.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.productsService.items||this.productsService.items.length===0){
      this.loadPage();
    }    
  }

  loadPage(){
    this.productsService.loadProducts(null);  
  }

  itemSelectedEmit(event) {    
    this.router.navigate(["/detail", event]);
  }
}
