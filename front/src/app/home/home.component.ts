import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('isExpand',[
      state('true', style({
        height: '100px',
        width: 'auto',
        margin: '20px 10px 20px 10px',

      })),
      state('false', style({
        height: '60px',
        width: 'auto',
        margin: '20px 7px 20px 7px',
      })),
      transition('true <=> false', animate(150)),
    ])
  ]
})
export class HomeComponent {
  imageUrl: string = 'assets/Home_pp.png';

  isExpanded = new Map<string, boolean>()
  constructor() {
    this.isExpanded.set("Breguet", false);
    this.isExpanded.set("Chopard", false);
    this.isExpanded.set("Graff", false);
    this.isExpanded.set("Jacob_Co", false);
    this.isExpanded.set("Jaeger_LeCoultre", false);
    this.isExpanded.set("Patek_Philippe", false);
    this.isExpanded.set("Rolex", false);
    this.isExpanded.set("Vacheron_Constantin", false);
  }
  expandImage(id: string){
    this.isExpanded.set(id, true);
    // open();
  }
  shrinkImage(id: string){
    this.isExpanded.set(id, false);
    // close();
  }

}
