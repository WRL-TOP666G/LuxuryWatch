import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PurchaseService} from "../../shared/services/purchase.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StatusDialogComponent} from "./status-dialog/status-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent implements OnInit{
  purchasesWithQnyTime: Object[] | undefined;
  time = 300;

  purchaseList: Object[] | undefined;

  displayedColumns: string[] = ['id', 'user_id', 'product_id', 'model', 'manufacturer', 'quantity', 'price', 'purchaseDate', 'status'];
  dataSource: MatTableDataSource<Object> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private purs: PurchaseService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(){
    this.buildUpPurchasesWithQnyTime(100);
    this.buildPaginator_Sort(150);
  }

  buildPaginator_Sort(t: number){
    setTimeout(()=>{
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      // @ts-ignore
      this.dataSource.sort = this.sort;
      console.log(this.purchaseList);
    }, this.time+t);
  }
  buildUpPurchasesWithQnyTime(t: number){
    this.purs.getPurchaseAll()
      .subscribe((res)=>{
        this.purchaseList = res;
      });

    setTimeout(() => {
      // @ts-ignore
      this.purchasesWithQnyTime = this.purchaseList.map(({id, user, product, quantity, purchase_date, status}) => (
        {
          id: id,
          user_id: user.id,
          product_id: product.id,
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
          purchaseDate:purchase_date.split('.')[0],
          status: status
        }));
      this.dataSource = new MatTableDataSource(this.purchasesWithQnyTime);
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



  doChangeStatus(row: any){
    // console.log(row);
    this.cdr.markForCheck();
    console.log(row);
    const dialogRef = this.dialog.open(StatusDialogComponent,{
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        cancel: false,
        complete: false
      }
    })
    //
    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          if(res.cancel && !res.complete){
            this.cancelStatus(row.id);
          }
          else if(!res.cancel && res.complete){
            this.completeStatus(row.id);
          }
        },
        error: err => console.log(err)
      })
  }

  cancelStatus(id: number){
    console.log('Do cancel!');
    this.purs.cancelPurchase(id)
        .subscribe({
          next: (item)=>{
            console.log(item)
            this.buildUpPurchasesWithQnyTime(50);
            this.buildPaginator_Sort(80);
          },
          error: (err)=>{console.log(err)},
          complete: () => {console.log('Finish ')}
        });
  }

  completeStatus(id: number){
    console.log('Do complete!');
    this.purs.completePurchase(id)
      .subscribe({
        next: (item)=>{
          console.log(item)
          this.buildUpPurchasesWithQnyTime(50);
          this.buildPaginator_Sort(80);
        },
        error: (err)=>{console.log(err)},
        complete: () => {console.log('Finish ')}
      });
  }


}
