import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {groupBy, mergeMap, Observable, reduce} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] | undefined;
  private api = environment.api;
  constructor(
      private httpClient: HttpClient
  ) {}

  public getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.api}/products`);
  }

  public getProduct(id: string): Observable<Product | undefined>{
    return this.httpClient.get<Product>(`${this.api}/products/${id}`);
  }

  public updateStock(cart_id: number | undefined): Observable<number | undefined>{
    // @ts-ignore
    return this.httpClient.put<number>(`${this.api}/products/updateStock/${cart_id}`);
  }

  public updateProductStock(product: Product | undefined): Observable<Product | undefined>{
    // @ts-ignore
    return this.httpClient.put<Product>(`${this.api}/products/updateProductStock`, product);
  }

  public deleteProduct(id: number | undefined): Observable<Product | undefined>{
    // @ts-ignore
    return this.httpClient.delete<Product>(`${this.api}/products/delete/${id}`);
  }

}
