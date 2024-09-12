import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  private api = environment.api;
  constructor(private httpClient: HttpClient) {}

  public getPurchaseAll():Observable<Object[] | undefined>{
    return this.httpClient.get<Object[]>(`${this.api}/purchase/getAll`);
  }
  public getPurchaseByUserId(user_id: number | undefined): Observable<Object[] | undefined>{
    // @ts-ignore
    return this.httpClient.get<Object[]>(`${this.api}/purchase/getPurchaseList/${user_id}`);
  }

  public cancelPurchase(id: number | undefined): Observable<any>{
    // @ts-ignore
    return this.httpClient.put<any>(`${this.api}/purchase/cancel/${id}`)
  }

  public completePurchase(id: number | undefined): Observable<any>{
    // @ts-ignore
    return this.httpClient.put<any>(`${this.api}/purchase/complete/${id}`)
  }
}
