import { Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product";
import {ProductsService} from "../shared/services/products.service";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit{
  products: Product[] | undefined;

  showBrands = false;
  showPrices = false;
  showYears = false;
  showStyles = false;
  showSizes = false;
  showMaterials = false;
  showMovements = false;

  checkBrands: string | undefined;
  checkPrices: string | undefined;
  checkYears: number | undefined;
  checkStyles: string | undefined;
  checkSizes: number | undefined;
  checkMaterials: string | undefined;
  checkMovements: string | undefined;


  brandFreq: {[key:string]:number} | undefined;
  brands: {[key:string]:number} [] | undefined = [];

  priceFreq: {[key:string]:number} | undefined;
  prices: {[key:string]:number} [] | undefined = [];

  yearFreq: {[key:number]:number} | undefined;
  years: {[key:string]:number} [] | undefined = [];

  styleFreq: {[key:string]:number} | undefined;
  styles: {[key:string]:number} [] | undefined = [];

  sizeFreq: {[key:number]:number} | undefined;
  sizes: {[key:string]:number} [] | undefined = [];

  materialFreq: {[key:string]:number} | undefined;
  materials: {[key:string]:number} [] | undefined = [];

  movementFreq: {[key:string]:number} | undefined;
  movements: {[key:string]:number} [] | undefined = [];

  constructor(
      private ps: ProductsService
  ){}

  ngOnInit(){
    //this.products = this.ps.getProducts();
    this.ps.getProducts()
        .subscribe(products => {
          this.products = products;
          // this.ps.products = products;

          if (this.products) {
            this.countBrand(this.products);
            this.countPrice(this.products);
            this.countYear(this.products);
            this.countStyle(this.products);
            this.countSize(this.products);
            this.countMaterial(this.products);
            this.countMovement(this.products);
          }
        });
  }

  countBrand(ps : Product[] | undefined){
    // @ts-ignore
    this.brandFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.manufacturer] ? acc[curr.manufacturer]++ : acc[curr.manufacturer] = 1, acc;
    }, {});
    this.buildKeyValue(this.brandFreq, this.brands, false);

    // @ts-ignore
    this.brands.sort( (a,b) => {
      // @ts-ignore
      return a['key'][0] - b['key'][0];
    });
  }

  countPrice(ps : Product[] | undefined){
    // @ts-ignore
    this.priceFreq = ps.reduce(function (acc, curr) {
      if(curr.price<10){
        let range : string = 'Below $10M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      else if(10<=curr.price && curr.price<20){
        let range : string = '$10M - $19.99M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      else if(20<=curr.price && curr.price<30){
        let range : string = '$20M - $29.99M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      else if(30<=curr.price && curr.price<40){
        let range : string = '$30M - $39.99M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      else if(40<=curr.price && curr.price<50){
        let range : string = '$40M - $49.99M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      else if(50<=curr.price){
        let range : string = 'Over $50M';
        // @ts-ignore
        acc[range] ? acc[range]++ : acc[range] = 1
      }
      return acc
    }, {});
    this.buildKeyValue(this.priceFreq, this.prices, false);
    // @ts-ignore
    this.prices.sort( (a,b) => {
      // @ts-ignore
      return a['key'][0] === b['key'][0] ? a['key'][1]-b['key'][1] : a['key'] - b['key']
    });

    // @ts-ignore
    this.prices.push(this.prices[1]);
    // @ts-ignore
    this.prices.splice(1,1);
  }
  countYear(ps : Product[] | undefined){
    // @ts-ignore
    this.yearFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.year] ? acc[curr.year]++ : acc[curr.year] = 1, acc;
    }, {});
    this.buildKeyValue(this.yearFreq, this.years, true);
  }

  countStyle(ps : Product[] | undefined){
    // @ts-ignore
    this.styleFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.style] ? acc[curr.style]++ : acc[curr.style] = 1, acc;
    }, {});
    this.buildKeyValue(this.styleFreq, this.styles, false);
  }
  countSize(ps : Product[] | undefined){
    // @ts-ignore
    this.sizeFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.size] ? acc[curr.size]++ : acc[curr.size] = 1, acc;
    }, {});
    // console.log(this.sizeFreq);
    this.buildKeyValue(this.sizeFreq, this.sizes, true);
  }

  countMaterial(ps : Product[] | undefined){
    // @ts-ignore
    this.materialFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.material] ? acc[curr.material]++ : acc[curr.material] = 1, acc;
    }, {});
    this.buildKeyValue(this.materialFreq, this.materials, false);
  }

  countMovement(ps : Product[] | undefined){
    // @ts-ignore
    this.movementFreq = ps.reduce(function (acc, curr) {
      // @ts-ignore
      return acc[curr.movement] ? acc[curr.movement]++ : acc[curr.movement] = 1, acc;
    }, {});
    this.buildKeyValue(this.movementFreq, this.movements, false);
  }

  buildKeyValue(
      input : {[key:string]:number} | undefined,
      res: {[key:string]:number} [] | undefined = [],
      isNum:boolean
  ){
    // @ts-ignore
    const arr = Object.entries(input);
    for(let i in arr){
      const tmp = {}
      Object.defineProperty(tmp, 'key', {
        value: !isNum ? arr[i][0]: !isNaN(Number(arr[i][0]))?Number(arr[i][0]): null,
        enumerable: true,
        writable: false
      })
      Object.defineProperty(tmp, 'freq', {
        value: arr[i][1],
        enumerable: true,
        writable: false
      })
      // console.log(arr[i][0], arr[i][1])
      // console.log(tmp)
      res.push(tmp)
    }
  }

  clearBrands(){this.checkBrands = undefined;}
  clearPrices(){this.checkPrices = undefined;}
  clearYears(){this.checkYears = undefined;}
  clearStyles(){this.checkStyles = undefined;}
  clearSizes(){this.checkSizes = undefined;}
  clearMaterials(){this.checkMaterials = undefined;}
  clearMovements(){this.checkMovements = undefined;}
  clearAll(){
    this.clearBrands();
    this.clearPrices();
    this.clearYears();
    this.clearStyles();
    this.clearSizes();
    this.clearMaterials();
    this.clearMovements();
  }

}
