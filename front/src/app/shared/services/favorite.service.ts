import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private api_api = environment.api_api;
  constructor(private httpClient: HttpClient) { }

  public getFavorites():Observable<Object[] | undefined>{
    return this.httpClient.get<Object[]>(`${this.api_api}/favorite`);
  }

  public getFavoritesByUserId(user_id: number | undefined): Observable<Object[] | undefined>{
    return this.httpClient.get<Object[]>(`${this.api_api}/favorite/${user_id}`);
  }

  public createFavorite(favorite: object | undefined): Observable<Object | undefined>{
    return this.httpClient.post<Object>(`${this.api_api}/favorite`, favorite);
  }

  public deleteFavorite(id: number | undefined): Observable<Object | undefined>{
    return this.httpClient.delete<Object>(`${this.api_api}/favorite/${id}`);
  }


}
