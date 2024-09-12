import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../shared/models/product";
import {ProductsService} from "../../../shared/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {UsersService} from "../../../shared/services/users.service";
import {User} from "../../../shared/models/user";
import {ReviewService} from "../../../shared/services/review.service";
import {Review} from "../../../shared/models/review";
import {FavoriteService} from "../../../shared/services/favorite.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

  product!: Product | undefined;
  id: string | undefined;
  count = 0;
  user_id: number | undefined;
  product_id: number | undefined;
  user: User | undefined;

  reviews: Review[] | undefined;


  selected: boolean = false;
  disabledID: boolean = false;
  favoriteList: object[] | undefined;
  nowFavorite: object | undefined;


  constructor(
      private ar: ActivatedRoute,
      private ps: ProductsService,
      private cs: CartService,
      private us: UsersService,
      private router: Router,
      private rs: ReviewService,
      private fs: FavoriteService
  ){}

  ngOnInit(){
    this.user_id = Number(localStorage.getItem('id'));
    this.disabledID = this.user_id===0 || this.user_id===1;

    this.ar.paramMap
        .pipe(switchMap(params => {
          this.id=params.get('id') || '1';
          return this.ps.getProduct(this.id);
        }))
        .subscribe({
          next: product => {
            this.product=product
            this.product_id = product?.id
            // console.log(this.product_id);
          },
          error: err => console.log(err),
          complete: () => console.log('getProductDetail Completed'),
        });

    this.rs.getReviewsByProductId(Number(this.id) )
      .subscribe(items =>{
        this.reviews = items;
      })

    setTimeout( ()=>
      this.fs.getFavoritesByUserId(this.user_id)
        .subscribe({
          next: item =>{
        this.favoriteList = item;
        console.log('Favorite: ', this.favoriteList);
      },
          error: err => console.log(err),
          complete: ()=>{
            // @ts-ignore
            this.nowFavorite = this.favoriteList.find((item)=>{
              // @ts-ignore
              return item.product_id === this.product_id
            })
            // console.log('find: ', this.nowFavorite);
            this.selected = !!this.nowFavorite;
          }
        })
      , 130);

  }
  Increment1(){ this.count++; }
  Decrement1(){ this.count--;}

  add2Cart(){
    if(this.count<=0){
      alert('The number should be larger than 0');
    }
    // @ts-ignore
    else if(this.count>this.product?.stock){
      alert('The number is out of maximum');
    }
    else{
      // Add to Cart
      this.cs.createCartItem(this.user_id, this.product, this.count)
          .subscribe( (res:{success: any}) =>{
            alert('Success Add this product!');
            this.router.navigate(['/products']).catch();
          });

    }
  }


  toggleSelected() {


    this.selected = !this.selected;

    if(this.selected){
      const favorite = {
        user_id: this.user_id,
        product_id: this.product_id
      }
      console.log(favorite)

      this.fs.createFavorite(favorite)
        .subscribe({
          next: res => console.log(`Success in ${res}`),
          error: err => console.log(err),
        });
      console.log(`You add ${this.product?.model} to favorite`);
    }
    else{
      // @ts-ignore
      this.fs.deleteFavorite(this.nowFavorite.id)
        .subscribe({
          next: res => console.log(`Success in ${res}`),
          error: err => console.log(err),
        });
      console.log(`You delete ${this.product?.model} to favorite`);
    }
  }
}
