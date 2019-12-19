import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { constantsApi } from "../../constants/constantsApi";
import { products } from './mocks/products/products';
import { sections } from './mocks/sections/sections';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];
let productList = products.PRODUCTS;
let sectionList = sections.SECTIONS;
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;


    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) 
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        /* case url.endsWith(constantsApi.API_PRODUCTS) && method === "GET":
          return products(); */
        /* case url.endsWith(constantsApi.API_SECTIONS) && method === "GET":
          return sections(); */
        default:
          return next.handle(request);
      }
    }

    // route functions
    function products() {
      let ar = [];      
      ar.push(productList[0]);
      ar.push(productList[1]);
      ar.push(productList[2]);
      ar.push(productList[3]);
      ar.push(productList[4]);
      ar.push(productList[0]);
      ar.push(productList[1]);
      ar.push(productList[2]);
      ar.push(productList[0]);
      ar.push(productList[1]);
      ar.push(productList[2]);
      ar.push(productList[3]);
      return ok(ar);
    }
    function sections(){
      return ok(sectionList);
    }

     // helper functions

     function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }

  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
