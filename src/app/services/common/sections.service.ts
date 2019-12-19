import { Injectable } from "@angular/core";
import { MyBasicService } from "./my-basic-service";
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { constantsApi } from '../../../constants/constantsApi';

@Injectable({
  providedIn: "root"
})
export class SectionsService extends MyBasicService {
  constructor(
    public httpClient: HttpClient,
    private loginService: LoginService
  ) {
    super(httpClient);
  }

  async getSections() {
    let items = await super
      .get(environment.API_ENDPOINT + constantsApi.API_SECTIONS_WPLATFORMS, {})       
      .toPromise();
    return items;
  }
}
