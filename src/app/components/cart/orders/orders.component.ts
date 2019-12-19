import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ProductOrders} from "../models/product-orders.model";
import {Subscription} from "rxjs/internal/Subscription";
import {EcommerceService} from "../services/EcommerceService";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit  {
    orders: ProductOrders;
    total: number;
    paid: boolean;
    sub: Subscription;

    constructor(private ecommerceService: EcommerceService) {
        this.orders = this.ecommerceService.ProductOrders;
    }

    ngOnInit() {
        debugger;
        this.paid = false;
        this.orders = this.ecommerceService.ProductOrders;
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.orders = this.ecommerceService.ProductOrders;
        });
        this.loadTotal();
    }
    ngAfterViewInit(){
        
    }

    pay() {
        this.paid = true;
        this.ecommerceService.saveOrder(this.orders).subscribe();
    }

    loadTotal() {
        this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
            this.total = this.ecommerceService.Total;
        });
    }
}
