import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../shared/models/user";
import {Cart} from "../shared/models/cart";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import {UsersService} from "../shared/services/users.service";
import {OrderService} from "../shared/services/order.service";
import {PurchaseService} from "../shared/services/purchase.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "./comment-dialog/comment-dialog.component";
import {UpdateQuantityComponent} from "../cart/update-quantity/update-quantity.component";
import {ReviewService} from "../shared/services/review.service";
import {Review} from "../shared/models/review";
import {CancelDialogComponent} from "./cancel-dialog/cancel-dialog.component";

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class PurchaseHistoryComponent implements OnInit, AfterViewInit{
  user_id: number | undefined;
  user: User | undefined;
  cart: Cart | undefined;
  purchasesWithQnyTime: Object[] | undefined;
  time = 300;

  purchaseList: Object[] | undefined;

  displayedColumns: string[] = ['id', 'model', 'manufacturer', 'quantity', 'price', 'purchaseDate', 'status','comment'];
  dataSource: MatTableDataSource<Object>;

  // rate: number| undefined;
  // comment: string | undefined;
  reviewList: any;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
      private ar: ActivatedRoute,
      private cs: CartService,
      private us : UsersService,
      private os : OrderService,
      private purs: PurchaseService,
      public dialog: MatDialog,
      private rs: ReviewService,
      public cdr: ChangeDetectorRef
  ) {

    this.dataSource = new MatTableDataSource();
  }
  ngOnInit() {
    // user_id
    this.user_id = Number(localStorage.getItem('id'));

    this.purs.getPurchaseByUserId(this.user_id)
        .subscribe((res)=>{
          this.purchaseList = res;
          console.log(this.purchaseList)
        })


    setTimeout(() => {
      // @ts-ignore
      this.purchasesWithQnyTime = this.purchaseList.map(({id, product, quantity, purchase_date, status}) => (
          {
            id: id,
            product_id: product['id'],
            model: product['model'],
            manufacturer: product['manufacturer'],
            price: Number((product['price'] * quantity).toFixed(3)),
            year: product['year'],
            style: product['style'],
            size: product['size'],
            material: product['material'],
            movement: product['movement'],
            picture: product['picture'],
            quantity: quantity,
            purchaseDate:purchase_date.split('.')[0].replace('T', ' '),
            status: status
          }));
      console.log(this.purchaseList);
      this.dataSource = new MatTableDataSource(this.purchasesWithQnyTime);
    }, this.time+100);
  }

  ngDoCheck(){
    // this.rs.getReviewsByUserId(this.user_id)
    //   .subscribe( items=>{
    //     this.reviewList = items;
    //   });
    // console.log(this.reviewList)
  }
  ngAfterViewInit() {
    setTimeout(()=>{
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      // @ts-ignore
      this.dataSource.sort = this.sort;
    }, this.time+200);

    setTimeout(()=>{
      this.rs.getReviewsByUserId(this.user_id)
        .subscribe( items=>{
          this.reviewList = items;
        });

    }, this.time+300);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  leaveComment(row: any){
    this.cdr.markForCheck();
    const dialogRef = this.dialog.open(CommentDialogComponent,{
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {rate: 5, comment: ''}
    })

    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          console.log('This is in purchase history ', res);
          if(res) {
            console.log(row);
            console.log('Finish ! ');
            console.log(this.user_id);
            const review : Review = {
              user_id: this.user_id,
              product_id: row.product_id,
              rating: res.rating,
              comment: res.comment,
              review_date: null
            }
            console.log(review);
            this.rs.createReview(review)
              .subscribe( item=>{
                if(item){
                  this.rs.getReviewsByUserId(this.user_id)
                    .subscribe( items=>{
                      this.reviewList = items;
                    });
                  console.log(this.reviewList)
                }
              });
          }
        },
    })
  }

  checkReviewExisted(row: any){
    if(this.reviewList) {
      const existReview = this.reviewList.filter((item: Review) => {
        return item.product_id === row.product_id;
      })
      if(existReview.length){
        return true;
      }
    }
    return false;
  }

  checkStatusIsComplete(row: any): boolean{
    if(row.status==='Complete') return true;
    else return false;
  }

  doCancel(row: any){
    // console.log(row);
    this.cdr.markForCheck();
    const dialogRef = this.dialog.open(CancelDialogComponent,{
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {cancel: false}
    })

    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          console.log('This is in Cancel ', res);
          if(res && res.cancel){
            console.log(row.id);
            console.log('Do Cancel Action')

            this.purs.cancelPurchase(row.id)
              .subscribe({
                next: (item)=>{
                  console.log(item)

                  this.purs.getPurchaseByUserId(this.user_id)
                    .subscribe((res)=>{
                      this.purchaseList = res;
                    });

                  setTimeout(() => {
                    // @ts-ignore
                    this.purchasesWithQnyTime = this.purchaseList.map(({id, product, quantity, purchase_date, status}) => (
                      {
                        id: id,
                        product_id: product['id'],
                        model: product['model'],
                        manufacturer: product['manufacturer'],
                        price: Number((product['price'] * quantity).toFixed(3)),
                        year: product['year'],
                        style: product['style'],
                        size: product['size'],
                        material: product['material'],
                        movement: product['movement'],
                        picture: product['picture'],
                        quantity: quantity,
                        purchaseDate:purchase_date.split('.')[0].replace('T', ' '),
                        status: status
                      }));
                    console.log(this.purchaseList);
                    this.dataSource = new MatTableDataSource(this.purchasesWithQnyTime);
                  }, this.time+100);
                },
                error: (err)=>{console.log(err)},
                complete: () => {console.log('Finish ')}
              });
          }

        },
      })
  }
}


