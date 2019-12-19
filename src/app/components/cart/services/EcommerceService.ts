import { ProductOrder } from "../models/product-order.model";
import { Subject } from "rxjs/internal/Subject";
import { ProductOrders } from "../models/product-orders.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ProductsService } from '../../../services/common/products.service';
import { environment } from '../../../../environments/environment';
import { constantsApi } from '../../../../constants/constantsApi';

@Injectable()
export class EcommerceService {
    private productsUrl = "/products";
    private ordersUrl = "/orders";

    private productOrder: ProductOrder;
    public orders: ProductOrders = new ProductOrders();

    private productOrderSubject = new Subject();
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;

    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    private productsInCart: ProductOrder[] = [];
    public productsInCartObs: Subject<ProductOrder[]> = new Subject();

    constructor(private http: HttpClient, private productsService: ProductsService) {
    }

    getAllProducts() {
        return this.productsService.get(environment.API_ENDPOINT + constantsApi.API_PRODUCTS, {})
        /* return this.http.get(this.productsUrl); */
    }

    saveOrder(order: ProductOrders) {
        return this.http.post(this.ordersUrl, order);
    }

    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }

    addToCart(order) {
        debugger;
        this.productsInCart.push(new ProductOrder(order, 1))
        this.productsInCartObs.next(this.productsInCart);

        this.orders.productOrders.push(new ProductOrder(order, 1));
        /* this.ordersSubject.next(); */
        
    }
    getproductsInCart() {
        return this.productsInCart;
    }
    getproductsInCartObs() {
        return this.productsInCartObs.asObservable();
    }
}
