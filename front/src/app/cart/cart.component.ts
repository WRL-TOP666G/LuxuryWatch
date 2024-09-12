import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import {UsersService} from "../shared/services/users.service";
import {OrderService} from "../shared/services/order.service";
import {User} from "../shared/models/user";
import {Cart} from "../shared/models/cart";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../shared/models/product";
import {UpdateProductComponent} from "../admin/all-products/update-product/update-product.component";
import {UpdateQuantityComponent} from "./update-quantity/update-quantity.component";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  user_id: number | undefined;
  user: User | undefined;
  cart: Cart | undefined;
  cartItemList: Object[] | undefined;
  productsWithQuantity: Object[] | undefined;
  total: number = 0;
  isLargerThan1000 = false;
  isAble2Checkout = false;
  time = 300;


  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'model', 'brand', 'quantity', 'price', 'update_delete'];
  displayedColumns: string[] = ['id', 'model', 'manufacturer', 'quantity', 'price', 'update_delete'];
  dataSource: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChildren('myQnt') myQnt?: QueryList<ElementRef>;



  constructor(
    private ar: ActivatedRoute,
    private cs: CartService,
    private us: UsersService,
    private os: OrderService,
    private _dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.buildUpProductsWithQuantity(100);
    this.buildUpPaginator_Sort(200);
  }
  buildUpProductsWithQuantity(t:number){
    // user_id
    this.user_id = Number(localStorage.getItem('id'));

    // user user_id to get cart_id
    this.us.getUser(this.user_id)
      .subscribe(user => {
        this.user = user;
      });

    // use user_id to get cart_id from <LW_CART> (1:1)
    this.cs.getCartByUserId(this.user_id)
      .subscribe(x => {
        this.cart = x;
      })

    setTimeout(() =>
      this.cs.getCartItemByCartId(this.cart?.id)
        .subscribe(x => {
          this.cartItemList = x;

          // @ts-ignore
          this.productsWithQuantity = this.cartItemList.map(({product, quantity}) => (
            {
              id: product['id'],
              model: product['model'],
              manufacturer: product['manufacturer'],
              price: Number((product['price'] * quantity).toFixed(3)),
              year: product['year'],
              style: product['style'],
              size: product['size'],
              material: product['material'],
              movement: product['movement'],
              picture: product['picture'],
              quantity: quantity
            }));
        }), this.time+t);


    // use product_id to get product info from <LW_PRODUCT> (1:1)
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.productsWithQuantity);
      // @ts-ignore
      this.isAble2Checkout = this.productsWithQuantity?.length > 0;
      console.log(this.productsWithQuantity);
    }, this.time + 100 + t);
  }
  buildUpPaginator_Sort(t: number){
    this.total = 0;
    setTimeout(() => {
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      // @ts-ignore
      this.dataSource.sort = this.sort;

      if (this.productsWithQuantity) {
        Object.values(this.productsWithQuantity).forEach(x => {
          // @ts-ignore
          this.total += x['price'];
        });
      }
      this.total = Number(this.total.toFixed(3));
    }, this.time + t);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateQuantity2(row: any) {
    // @ts-ignore
    const cartItem = this.cartItemList.find(x => {
      // @ts-ignore
      return x.product.id == row.id
    });

    const dialogRef = this._dialog.open(UpdateQuantityComponent, {
      data: row.quantity
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            // @ts-ignore
            if (val.quantity === row.quantity) alert('The # of update and original stock should be different!');
            // @ts-ignore
            else if (val.quantity > cartItem.product.stock) alert('The stock is not enough');
            else if (val.quantity <= 0) alert('The # should be larger than 0');
            else {

              // @ts-ignore
              const product = this.productsWithQuantity.find(x => {
                // @ts-ignore
                return x.id == row.id
              });
              // @ts-ignore
              product.quantity = val.quantity;
              // @ts-ignore
              const tmp = this.cartItemList?.find(x => {
                // @ts-ignore
                return x.product.id === product.id
              })

              // @ts-ignore
              product.price = Number((tmp.product.price * val.quantity).toFixed(3));

              this.total = 0;
              // @ts-ignore
              Object.values(this.productsWithQuantity).forEach(x => {
                // @ts-ignore
                this.total += x['price'];

              });
              this.total = Number(this.total.toFixed(3));

              // @ts-ignore
              this.cs.updateCartItem(cartItem.id, cartItem.product, val.quantity)
                .subscribe((res: { success: boolean }) => {
                  alert('Success Update');
                  // window.location.reload();
                });
            }
          }
        },
      });
  }


  deleteItemFromCart(row: any) {
    // @ts-ignore
    const cartItem = this.cartItemList.find(x => {
      // @ts-ignore
      return x.product.id === row.id
    });
    console.log(cartItem);
    // @ts-ignore
    this.cs.deleteCartItem(cartItem.id)
      .subscribe({
        next: (res)=>{
          this.cdr.detectChanges();
          this.buildUpProductsWithQuantity(0);
          this.buildUpPaginator_Sort(100);
          alert('Success Delete');
        },
        error: err => console.log(err),

      })
  }
}

