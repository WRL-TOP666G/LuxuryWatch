import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api = environment.api;
  constructor(
      private httpClient: HttpClient
  ) {}


  public updateOrder(cart_id: number | undefined): Observable<number | undefined>{
    // @ts-ignore
    return this.httpClient.put<number>(`${this.api}/orders/update/${cart_id}`);
  }

}
