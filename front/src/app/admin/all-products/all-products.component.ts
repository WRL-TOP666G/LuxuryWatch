import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductsService} from "../../shared/services/products.service";
import {Product} from "../../shared/models/product";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProductComponent} from "./update-product/update-product.component";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllProductsComponent implements OnInit, AfterViewInit{
  time = 300;

  products: Product[] | undefined;

  displayedColumns: string[] = ['id', 'model', 'manufacturer', 'price', 'stock', 'update_delete'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();


  panelOpenState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private ps: ProductsService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(){
    this.ps.getProducts()
      .subscribe((res)=>{
        this.products = res;
      });

    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.products);
    }, this.time+100);
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      // @ts-ignore
      this.dataSource.sort = this.sort;
    }, this.time+200);
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

  updateStock(row: Product) {
    const dialogRef = this._dialog.open(UpdateProductComponent, {
      data: row
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (val) => {
        if (val) {
          if(val.stock === row.stock) alert('The # of update and original stock should be different!');
          else if(val.stock <= 0) alert('The # should be larger than 0');
          else{
            // @ts-ignore
            const product = this.products.find(x => {
              // @ts-ignore
              return x.id == row.id
            });
            // @ts-ignore
            product.stock = val.stock;
            this.ps.updateProductStock(product)
              .subscribe((res)=>{
                alert('Success Update');

                this.ps.getProducts()
                  .subscribe((res)=>{
                    this.products = res;
                  });

                setTimeout(() => {
                  this.dataSource = new MatTableDataSource(this.products);
                }, this.time+100);

                setTimeout(()=>{
                  // @ts-ignore
                  this.dataSource.paginator = this.paginator;
                  // @ts-ignore
                  this.dataSource.sort = this.sort;
                }, this.time+200);




              })
          }
        }
      },
    });
  }

  deleteProduct(row: any) {
    //TODO: delete
    console.log(row);
    const id = row.id;
    const product: Product = {
      id: row.id,
      model: row.model,
      manufacturer: row.manufacturer,
      price: row.price,
      year: row.year,
      style: row.style,
      size: row.size,
      material: row.material,
      movement: row.movement,
      picture: row.picture,
      stock: row.stock,
    }
    alert('You delete a product!!')
    this.ps.deleteProduct(id)
      .subscribe((res)=>{

        this.ps.getProducts()
          .subscribe((res)=>{
            this.products = res;
          });
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.products);
        }, this.time+100);
        setTimeout(()=>{
          // @ts-ignore
          this.dataSource.paginator = this.paginator;
          // @ts-ignore
          this.dataSource.sort = this.sort;
        }, this.time+200);
        // console.log(res);
      })

  }
}
