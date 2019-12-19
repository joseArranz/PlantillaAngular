import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { CookieService } from "ngx-cookie-service";
import { MyBasicService } from "./my-basic-service";
import { environment } from "src/environments/environment";
import { constantsApi } from "../../../constants/constantsApi";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService extends MyBasicService {
  private loginApp: Subject<boolean> = new Subject();
  private loginAppBol: boolean =  false;

  constructor(
    private cookieService: CookieService,
    public httpClient: HttpClient
  ) {
    super(httpClient);
    /* if (this.isAuthenticated()) {
      this.setLoggin(true);
    } else {
      this.setLoggin(false);
    } */
  }
  public isLoggin() {
    return this.loginApp.asObservable();
  }

  public setLoggin(login: boolean) {
    /* if (!login) {
        this.cleanSession();
    } */
    
    this.loginAppBol = login;
    this.loginApp.next(login);
  }
  public getLoggin() {
    
    return this.loginAppBol;
  }
  login(username, password) {
    
    let body = `username=${username}&password=${password}&grant_type=password`;
    return super
      .post(
        environment.API_ENDPOINT_LOGIN + constantsApi.API_LOGIN_OAUTH,
        body,
        super.getHeadersLogin()
      )
      .toPromise();
  }
  isAuthenticated() {
    let token = this.getToken();
    if (token && token !== "undefined" && token.access_token) {
      return true;
    } else {
      /* throw new UnauthorizedError("Not Token in Memory"); */
      return false;
    }
  }
  getToken() {
    return this.getCokieSesion();
  }
  getCokieSesion() {
    const allCookies: {} = this.cookieService.getAll();
    let token = allCookies["secretAng"];
    if (token) {
      try {
        return JSON.parse(token);
      } catch (error) {
        return null;
      }
    }
  }

  cleanSession() {
    this.cookieService.delete("secretAng");
  }

  makeCokieSesion(token) {
    this.cookieService.set("secretAng", JSON.stringify(token));
  }
  /* havePermisionUserModule() {
    if (this.isAuthenticated()) {
      let token = this.getToken();
      return (
        token.user.roles.includes(constantsRoles.RR_HH) ||
        token.user.roles.includes(constantsRoles.SUPERADMIN_ROLE)
      );
    }
  }
  getUserName() {
    if (this.isAuthenticated()) {
      let token = this.getToken();
      return token.user.username;
    }
  }

  isSuperAdmin() {
    if (this.isAuthenticated()) {
      let token = this.getToken();
      return token.user.roles.includes(constantsRoles.SUPERADMIN_ROLE);
    }
  } */
}
