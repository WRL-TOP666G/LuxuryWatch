import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Role} from "../shared/models/role";
import {UsersService} from "../shared/services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{
  title = 'Renaissance'
  brands: string[] = [
    "Breguet",
    "Chopard",
    "Graff",
    "Jacob & Co.",
    "Jaeger-LeCoultre",
    "Patek Philippe",
    "Rolex",
    "Vacheron Constantin"
  ]
  id: number | undefined;
  role: Role | undefined;
  constructor(
      public  auth: AuthService,
      private us: UsersService,
      private ar: ActivatedRoute
  ) {}

  ngOnInit(){

  }

  ngDoCheck() {
    if(!this.id) {
      this.id = Number(localStorage.getItem('id'));
      if(this.id && !this.role){
        this.us.getRole(this.id)
            .subscribe( role => this.role = role);
      }
    }
  }



}
