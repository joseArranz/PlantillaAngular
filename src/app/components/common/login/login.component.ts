import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../../services/common/login.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  /* @ViewChild('closebutton') closebutton; */
  constructor(private router: Router, private LoginService: LoginService, private toastr: ToastrService) {
    this.errorLogin = false;
  }
  errorLogin = false;
  ngOnInit() {}

  login(event, username, password) {
    //"joseUN", "abc123"
    let self = this;
    try {
      this.LoginService.login(username.value, password.value)
        .then(token => {
          self.LoginService.makeCokieSesion(token);
          self.LoginService.setLoggin(true);
          self.toastr.success('Login OK!', 'Welcome to Games');
        })
        .catch(reason => {
          self.errorLogin = true;
          self.toastr.error('Incorrect Login!', 'Bad User');
        });
    } catch (error) {}

    /* this.closebutton.nativeElement.click(); */
  }
  close(event) {
    /* this.closebutton.nativeElement.click(); */
  }

  singUp() {
    this.router.navigate(["/singUp", event]);
  }
}
