import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: object | null = null;
  constructor(
      private httpClient: HttpClient,
      private router: Router
  ) {
    this.checkLogin()
        .subscribe(res=>{
          if(res.success){
            this.user=res.user;
            // navigate to home, etc...
          }
        });
  }

  checkLogin():Observable<{success: boolean, user:any, token: string}>{
    /* for cookie/session based spring server:
        include a config object {withCredentials: true} in the req. ( add it for all reqs)
        it will carry/set cookie for the req
    * */
    return this.httpClient.get<{success: boolean, user:any, token: string}>(`${environment.api}/api/auth/checkLogin`);
  }

  login(user: {username: string, password: string}): Observable<{success: boolean, user: object, token:string}>{
    /* it backend requires from data instead of json,
      we need to convert user object to form data.
        Sample Code:
          const userFormData = new HttpParams()
          .append('username', user.username)
          .append('password', user.password);
        // the formData looks like this: username=bob&password=123
    * */
    return this.httpClient.post<{success: boolean, user: object, token: string}>(
        `${environment.api}/api/auth/login`, user);
  }

  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    // localStorage.removeItem('password');
    localStorage.removeItem('token');
    this.user=null;
    this.router.navigate(['/home']).catch();
    setTimeout(()=>{
      window.location.reload();
    }, 0);

  }

  register(user:{username: string, password: string}): Observable<{success: boolean, user: object}>{
    // console.log('-----');
    return this.httpClient.post<{success:boolean, user: object}>(`${environment.api}/api/auth/register`, user);
  }

  updateUserinfo(userinfo: {
    id: number | undefined,
    name : string,
    phone : string,
    email: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: number,
    user: object
  }): Observable<{success: boolean, userinfo: object}>{
    return this.httpClient.put<{success:boolean, userinfo: object}>(`${environment.api}/userinfo`, userinfo);
  }
}
