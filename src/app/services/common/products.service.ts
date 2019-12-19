import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { constantsApi } from '../../../constants/constantsApi';
import { MyBasicService } from './my-basic-service';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';
import { ProductOrder } from '../../components/cart/models/product-order.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: "root"
})
export class ProductsService extends MyBasicService {
  items: any = [];
  loadingProducts = false;

 

  constructor(
    public httpClient: HttpClient,
    private loginService: LoginService
  ) {
    super(httpClient);
  }

  loadProducts(seach) {
    this.loadingProducts = true;
    if (!seach) {
      super
        .get(environment.API_ENDPOINT + constantsApi.API_PRODUCTS, {}).subscribe(products => {
          this.items = products;
          this.loadingProducts = false;
        });
    } else {
      super
        .get(environment.API_ENDPOINT + constantsApi.API_PRODUCTS_SEARCH + '/' + encodeURIComponent(seach.trim()), {}).subscribe(products => {
          this.items = products;
          this.loadingProducts = false;
        });
    }
  }
  loadProductsByCategory(section, platform) {
    this.loadingProducts = true;
    super
      .get(environment.API_ENDPOINT + constantsApi.API_PRODUCTS_SEARCH_CATEGORY + '/' + encodeURIComponent(section) + '/' +
        encodeURIComponent(platform) + '/', {}).subscribe(products => {
          this.items = products;
          this.loadingProducts = false;
        });
  }




}
