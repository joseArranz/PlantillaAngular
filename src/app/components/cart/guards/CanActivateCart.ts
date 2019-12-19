import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { LoginService } from '../../../services/common/login.service';


@Injectable()
export class CanActivateCart implements CanActivate {
    
    constructor(
        private loginService :LoginService,
        private router: Router) { }
    
    canActivate() {                                    
        if(this.loginService.isAuthenticated()){
            return true;
        }else{
            this.router.navigate(['/home']);
            return false;
        }                    
    }
}