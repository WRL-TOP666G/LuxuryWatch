import { Component } from '@angular/core';
import {Product} from "../shared/models/product";
import {ProductsService} from "../shared/services/products.service";
import {Subscription} from "rxjs";
import {FavoriteService} from "../shared/services/favorite.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  user_id: number | undefined;
  products: Product[] | undefined;
  favoriteList: Object[] | undefined;
  favoriteProducts: Product[] | undefined = [];
  constructor(
    private ps: ProductsService,
    private fs: FavoriteService
  ){}

  ngOnInit(){
    this.user_id = Number(localStorage.getItem('id'));
    this.ps.getProducts()
      .subscribe({
      next: data => { this.products = data},
      error: (err) => {console.log(err)}
      })

    setTimeout(()=>{
      this.fs.getFavoritesByUserId(this.user_id)
        .subscribe({
          next: res => this.favoriteList=res,
          error: err => console.log(err),
          complete: () => {
            // @ts-ignore
            for(let favorite of this.favoriteList){

              // @ts-ignore
              const product_id = favorite.product_id;
              // console.log(product_id);
              // console.log(this.products)
              // @ts-ignore
              let find = this.products.find((item)=>{
                // @ts-ignore
                return item.id === product_id;
              })
              // console.log(find);
              if(find) {
                // @ts-ignore
                this.favoriteProducts.push(find);
              }
            }
            console.log(this.favoriteProducts);
          }
        })
    }, 200);
  }

}

