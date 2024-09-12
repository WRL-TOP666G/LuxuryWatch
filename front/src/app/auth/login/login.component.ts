import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private auth: AuthService,
        private router: Router
    ){}
    login({value}: NgForm):void{
        this.auth.login(value)
            .subscribe((res: { success: any; user: any; token: string; }) =>{
                if(res.success){
                    this.auth.user = res.user;
                    localStorage.setItem('id', res.user.id);
                    localStorage.setItem('username', res.user.username);
                    // localStorage.setItem('password', res.user.password);
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/home']).catch();
                }
            })
    }
}
