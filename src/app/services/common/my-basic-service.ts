import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MyBasicService {
  constructor(public httpClient: HttpClient) {}

  get(url: string, httpOptions: any) {
    return this.httpClient.get(url, httpOptions);
  }

  post(url: string, body: any, httpOptions: any) {
    //console.log(httpOptions);    
    return this.httpClient.post(url, body, httpOptions);
  }
  put(url: string, body: any, httpOptions: any) {
    //console.log(httpOptions);
    return this.httpClient.put(url, body, httpOptions);
  }
  delete(url: string, httpOptions: any) {
    return this.httpClient.delete(url, httpOptions);
  }
  getHeadersToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: "Bearer " + token
      })
    };
    return httpOptions;
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json"
      })
    };
    return httpOptions;
  }
  getHeadersLogin() {
  
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0"
      })
    };    
    return httpOptions;
  }
}
