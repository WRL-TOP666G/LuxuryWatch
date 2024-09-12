import {Component, OnInit} from '@angular/core';
import {Product} from "./shared/models/product";
import {ProductsService} from "./shared/services/products.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = '';


}
