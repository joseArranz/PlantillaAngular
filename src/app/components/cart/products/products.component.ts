import { Component, OnInit } from '@angular/core';
import { ProductOrder } from "../models/product-order.model";
import { EcommerceService } from "../services/EcommerceService";
import { Subscription } from "rxjs/internal/Subscription";
import { ProductOrders } from "../models/product-orders.model";
import { Product } from "../models/product.model";


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productOrders: ProductOrder[] = [];
    products: Product[] = [];
    selectedProductOrder: ProductOrder;
    private shoppingCartOrders: ProductOrders;
    sub: Subscription;
    productSelected: boolean = false;

    constructor(private ecommerceService: EcommerceService
    ) {
    }

    ngOnInit() {
        this.productOrders = [];
        this.loadProducts();
        this.loadOrders();
    }

    addToCart(order: ProductOrder) {
        this.ecommerceService.SelectedProductOrder = order;
        this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
        this.productSelected = true;
    }

    removeFromCart(productOrder: ProductOrder) {
        let index = this.getProductIndex(productOrder.product);
        if (index > -1) {
            this.shoppingCartOrders.productOrders.splice(
                this.getProductIndex(productOrder.product), 1);
        }
        this.ecommerceService.ProductOrders = this.shoppingCartOrders;
        this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        this.productSelected = false;
        debugger;
    }

    getProductIndex(product: Product): number {
        return this.ecommerceService.ProductOrders.productOrders.findIndex(
            value => value.product === product);
    }

    isProductSelected(product: Product): boolean {
        return this.getProductIndex(product) > -1;
    }

    loadProducts() {
        debugger;

        let products = this.ecommerceService.getproductsInCart();
        
        products.forEach(product => {
            this.products.push(product.product);
            this.productOrders.push(product);
            

        });
        
        

        this.ecommerceService.getproductsInCartObs()
            .subscribe(
                (products: ProductOrder[]) => {
                    debugger;

                    products.forEach(product => {
                        this.products.push(product.product);
                        this.productOrders.push(product);
                        
                    })

                },
                (error) => console.log(error)
            );
    }

    loadOrders() {
        debugger;
        this.shoppingCartOrders = this.ecommerceService.ProductOrders
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            debugger;
            this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        });
    }

    reset() {
        this.productOrders = [];
        this.loadProducts();
        this.ecommerceService.ProductOrders.productOrders = [];
        this.loadOrders();
        this.productSelected = false;
    }
}
