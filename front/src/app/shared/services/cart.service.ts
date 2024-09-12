import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cart} from "../models/cart";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {User} from "../models/user";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient){}

  public getCartByUserId(user_id: number | undefined): Observable<Cart | undefined>{
    return this.httpClient.get<Cart | undefined>(`${environment.api}/carts/get/${user_id}`);
  }

  public getCartItemByCartId(cart_id: number | undefined): Observable<object[] | undefined>{
    return this.httpClient.get<object[] | undefined>(`${environment.api}/carts/getAll/${cart_id}`);
  }

  public createCart(user: User | undefined): Observable<User | undefined>{
    return this.httpClient.post<User>(`${environment.api}/carts/create/cart`, user);
  }
  public updateCart(cart: Cart | undefined): Observable<Cart | undefined>{
    return this.httpClient.put<Cart>(`${environment.api}/carts/update/cart`, cart);
  }
  public createCartItem(user_id: number | undefined,
                        product: Product | undefined,
                        quantity: number | undefined): Observable<{success: boolean}>{
    const cartItemRequestDto = {
      user_id: user_id,
      product: product,
      quantity: quantity
    }
    return this.httpClient.post<{success: boolean}>(`${environment.api}/carts/create`, cartItemRequestDto);
  }

  public updateCartItem(cart_item_id: number | undefined,
                        product: Product | undefined,
                        quantity: number| undefined):Observable<{success:boolean}>{
    const cartItemRequestDto = {
      user_id: cart_item_id,
      product: product,
      quantity: quantity
    }
    return this.httpClient.put<{success:boolean}>(`${environment.api}/carts/update/cartItem`, cartItemRequestDto);
  }

  public deleteCartItem(cartItem_id: number | undefined):Observable<any>{
    return this.httpClient.delete(`${environment.api}/carts/delete/cartItem/${cartItem_id}`);
  }

  public clearCartItem(cart_id: number | undefined):Observable<ArrayBuffer>{
    // @ts-ignore
    return this.httpClient.delete(`${environment.api}/carts/clear/${cart_id}`);
  }

}
