import { Component } from '@angular/core';
import {User} from "../../shared/models/user";
import {Userinfo} from "../../shared/models/userinfo";
import {Cart} from "../../shared/models/cart";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {CartService} from "../../shared/services/cart.service";
import {OrderService} from "../../shared/services/order.service";
import {ProductsService} from "../../shared/services/products.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

class Role {
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  user_id: number | undefined;
  user: User | undefined;
  userinfo: Userinfo | undefined;
  role : Role | undefined;
  cart: Cart | undefined;
  cartItemList: Object[] | undefined;
  time = 300;

  subtotal = 0;
  tax = 0;
  total = 0;
  isLargerThan1000 = false;

  nameOnCard = new FormControl('', [Validators.required]);
  CCN = new FormControl('', [Validators.required]);
  Expire = new FormControl('', [Validators.required]);
  CVV = new FormControl('', [Validators.required, Validators.maxLength(4)]);



  constructor(
      private us: UsersService,
      private cs: CartService,
      private os: OrderService,
      private ps: ProductsService,
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router
  ){}
  ngOnInit() {
    this.user_id = Number(localStorage.getItem('id'));

    this.us.getUser(this.user_id)
        .subscribe(user =>{
          this.user = user;
        });
    this.us.getUserInfo(this.user_id)
        .subscribe(userinfo =>{
          this.userinfo = userinfo;
        });
    this.us.getRole(this.user_id)
        .subscribe(role =>{
          this.role = role;
        });


    setTimeout(()=>{
      console.log(this.userinfo);
    }, this.time);

    this.cs.getCartByUserId(this.user_id)
        .subscribe(x =>{
          this.cart = x;
        })
    // use cart_id to get product_id <LW_CART_ITEM> (1:n)
    setTimeout(() =>
        this.cs.getCartItemByCartId(this.cart?.id)
            .subscribe(x => {
              this.cartItemList = x;
            }), this.time);



    setTimeout( () =>{
      // @ts-ignore
      this.cartItemList.forEach( ({product, quantity}) =>{
        this.subtotal += product['price'] * quantity;
      })

      // if(this.subtotal) this.subtotal=Number(this.subtotal.toFixed(3));
      // if(this.subtotal && this.subtotal>=1000){
      //   this.isLargerThan1000 = true;
      //   this.subtotal/=1000;
      // }
      this.tax = Number((this.subtotal*0.1).toFixed(3));
      this.total = this.subtotal + this.tax;
      this.total = Number(this.total.toFixed(6));
    }, this.time+100);
  }




  getErrorMessageFromNameOnCard() {
    if (this.nameOnCard.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getErrorMessageFromCCN() {
    if (this.CCN.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getErrorMessageFromExpire() {
    if (this.Expire.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getErrorMessageFromCVV() {
    if (this.CVV.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }


  checkout(){
    if(!this.nameOnCard.value || !this.CCN.value || !this.Expire.value || !this.CVV.value){
      alert("Fill out all information")
    }
    else{
      // create order and purchase dataset in DB
      // @ts-ignore
      this.os.updateOrder(this.cart.id)
          .subscribe((res)=>{
            console.log('Success on updating Order: ', res);
          })

      // update product's stock
      // ProductController -> updateStock
      // @ts-ignore
      this.ps.updateStock(this.cart.id)
          .subscribe((res)=>{
            console.log('Success on updating stock: ', res);
          })


      // clear items in cart
      // for -> CartController -> deleteCartItem

      // @ts-ignore
      this.cs.clearCartItem(this.cart.id)
          .subscribe(res=>{
            console.log('Success clearing cartItem', res);
          })

      // update current cart status to COMPLETE
      // CartController -> updateCart

      // @ts-ignore
      this.cs.updateCart(this.cart)
          .subscribe((res)=>{
            console.log('Success change status in current cart', res);
          });
      // create a new cart
      // CartController -> createCart
      // @ts-ignore
      this.cs.createCart(this.user)
          .subscribe((res) => {
            console.log('Success creating new cart', res);
          })

      alert("Success!");
      this.router.navigate(['/home']).catch();
    }
  }


}
