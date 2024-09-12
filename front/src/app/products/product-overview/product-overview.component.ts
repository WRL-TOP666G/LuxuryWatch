import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {User} from "../../shared/models/user";
import {ProductsService} from "../../shared/services/products.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsersService} from "../../shared/services/users.service";

import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent {

  @Input()
  product: Product | undefined;




  //
  //
  //
  // products: Product[] | undefined;
  //
  // constructor(
  //   private ps: ProductsService,
  // ) {}
  //
  // ngOnInit() {
  //   this.getProducts();
  //   // this.getUsers();
  // }
  //
  // public getProducts(): void{
  //   this.ps.getProducts().subscribe(
  //     (response: Product[] | undefined) => {
  //       this.products = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //       alert(error.message)
  //     }
  //   )
  // }
  //
  // // public getUsers(): void{
  // //   this.us.getUsers().subscribe(
  // //     (response: User[] | undefined) => {
  // //       this.users = response;
  // //     },
  // //     (error: HttpErrorResponse) => {
  // //       console.log(error.message);
  // //       alert(error.message)
  // //     }
  // //   )
  // // }

}
