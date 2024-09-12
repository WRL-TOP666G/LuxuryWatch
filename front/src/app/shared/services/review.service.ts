import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private api = environment.api;
  private api_review = environment.api_api;
  constructor(private httpClient: HttpClient) {}

  public getReviews():Observable<Review[] | undefined>{
    return this.httpClient.get<Review[]>(`${this.api_review}/review`);
  }
  public getReviewsByProductId(product_id: number | undefined):  Observable<Review[] | undefined>{
    return this.httpClient.get<Review[]>(`${this.api_review}/review/product/${product_id}`);
  }


  public getReviewsByUserId(user_id: number | undefined):  Observable<any>{
    return this.httpClient.get<any>(`${this.api_review}/review/user/${user_id}`);
  }

  public createReview(review: Review | undefined):  Observable<Review | undefined>{
    return this.httpClient.post<Review>(`${this.api_review}/review`, review);
  }

  public deleteReview(review_id: number | undefined):  Observable<Review | undefined>{
    return this.httpClient.delete<Review>(`${this.api_review}/review/${review_id}`);
  }
}
