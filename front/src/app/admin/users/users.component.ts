import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, AfterViewInit{
  users: Object[] | undefined;

  time = 300;


  displayedColumns: string[] = ['id', 'username', 'password', 'delete'];
  dataSource: MatTableDataSource<Object> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private us:UsersService) {}
  ngOnInit(){
    this.us.getUsers()
      .subscribe((res)=>{
        this.users = res;
      })

    setTimeout(()=>{
      // @ts-ignore
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.dataSource);
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

  deleteUser(row: any) {
    // // @ts-ignore
    // const cartItem = this.cartItemList.find(x => {
    //   // @ts-ignore
    //   return x.product.id == row.id
    // });
    //
    // // @ts-ignore
    // console.log(cartItem.id);
    // // @ts-ignore
    // this.cs.deleteCartItem(cartItem.id)
    //   .subscribe((res: any) => {
    //     alert('Success Delete');
    //     window.location.reload();
    //   });
    console.log(row);
    alert('You delete a user!!')
    //TODO
  }


  isAdmin(row: any){
    if(row['id']!== 1) return false;
    return true
  }
}
