import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../shared/services/users.service";
import {ReviewService} from "../../shared/services/review.service";
import {Review} from "../../shared/models/review";
import {ProductsService} from "../../shared/services/products.service";
import {Product} from "../../shared/models/product";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent implements OnInit{
  reviews: Review[] | undefined;
  products: Product[] | undefined;
  reviewsProduct: Object[] | undefined;
  time = 300;

  displayedColumns: string[] = ['id', 'user_id', 'product_id', 'model', 'rating', 'comment', 'review_date', 'delete'];
  dataSource: MatTableDataSource<Object> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private rs: ReviewService,
    private ps: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(){
    this.buildUpReviewsProduct(0);
    this.buildUpPaginator_Sort(200);
  }
  buildUpReviewsProduct(t: number){
    this.rs.getReviews()
      .subscribe(res =>{
        this.reviews = res;
      });

    this.ps.getProducts()
      .subscribe(res =>{
        this.products = res;
      });

    setTimeout(()=>{
      // @ts-ignore
      this.reviewsProduct = this.reviews.map(({id, user_id, product_id, rating, comment, review_date}) => (
        {
          id: id,
          user_id: user_id,
          product_id: product_id,
          model: this.products?.find(x=>x.id === product_id)?.model,
          rating: rating,
          comment: comment,
          review_date: review_date
        }));

    }, this.time+50 + t)

    setTimeout(()=>{
      // @ts-ignore
      this.dataSource = new MatTableDataSource(this.reviewsProduct);
    }, this.time+100 + t);
  }

  buildUpPaginator_Sort(t: number){
    setTimeout(()=>{
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      // @ts-ignore
      this.dataSource.sort = this.sort;
    }, this.time+t);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // @ts-ignore
    if (this.dataSource.paginator) {
      // @ts-ignore
      this.dataSource.paginator.firstPage();
    }
  }

  delete(row: any) {
    this.rs.deleteReview(row.id)
      .subscribe(res=>{
        this.cdr.detectChanges();
        this.buildUpReviewsProduct(0);
        this.buildUpPaginator_Sort(200);
      });
  }
}
