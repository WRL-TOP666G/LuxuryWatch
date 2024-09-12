
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {environment} from "../../../environments/environment.development";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../models/role";
import {Userinfo} from "../models/userinfo";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = environment.api;
  public id: number | undefined;

  constructor(
      private httpClient: HttpClient,
      private ar: ActivatedRoute
  ) {}


  public getUsers(): Observable<User[] | undefined>{
    return this.httpClient.get<User[]>(`${this.api}/users`);
  }

  public getUser(id: number | undefined): Observable<User | undefined>{
    return this.httpClient.get<User>(`${this.api}/users/${id}`);
  }

  public getRole(id: number | undefined): Observable<Role | undefined>{
    return this.httpClient.get<Role>(`${this.api}/users/role/${id}`);
  }

  public getUserInfo(id: number | undefined): Observable<Userinfo | undefined>{
    return this.httpClient.get<Userinfo>(`${this.api}/userinfo/user_id/${id}`);
  }



  public getUserByUserName(username: string): Observable<User[] | undefined>{
    return this.httpClient.get<User[]>(`${this.api}/users/${username}`);
  }

  public getUserInfoByUsername(username: string): Observable<Userinfo | undefined>{
    return this.httpClient.get<Userinfo>(`${this.api}/userinfo/${username}`);
  }
}
