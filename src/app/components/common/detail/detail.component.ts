import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LoginService } from '../../../services/common/login.service';
import { ProductsService } from '../../../services/common/products.service';
import { EcommerceService } from '../../cart/services/EcommerceService';


@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  
  item: any;
  isLoggin =  false;
  
  
  public constructor(private route: ActivatedRoute,private loginService:LoginService, private ecommerceService: EcommerceService) {}

  ngOnInit() {
    
    this.route.params.subscribe( params => this.item = params );
    this.isLoggin= this.loginService.getLoggin();
    this.loginService.isLoggin().subscribe(arg => this.isLoggin = arg);
  }

  addToCart(event, item){
    debugger;
    this.ecommerceService.addToCart(item);
  }

      


}
