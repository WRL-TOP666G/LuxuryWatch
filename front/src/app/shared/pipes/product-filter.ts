import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "../models/product";

/*
* What is pipe?
* a function that can transform display values
* */

@Pipe({
  name: 'productFilter',
  pure: false
})

export class ProductFilter implements PipeTransform{
  transform(
    products: Product [],
    checkBrands: string | undefined = undefined,
    checkPrices: string | undefined = undefined,
    checkYears: number | undefined = undefined,
    checkStyles: string | undefined = undefined,
    checkSizes: number | undefined = undefined,
    checkMaterials: string | undefined = undefined,
    checkMovements: string | undefined = undefined,
  ){
    let productList = products;

    if(checkBrands){
      productList = productList.filter( p=> p.manufacturer === checkBrands);
    }
    if(checkPrices){
      switch (checkPrices){
        case 'Below $10M':
          productList = productList.filter( p=> p.price < 10);
          break;
        case '$10M - $19.99M':
          productList = productList.filter( p=> 10 <= p.price && p.price < 20);
          break;
        case '$20M - $29.99M':
          productList = productList.filter( p=> 20 <= p.price && p.price < 30);
          break;
        case '$30M - $39.99M':
          productList = productList.filter( p=> 30 <= p.price && p.price < 40);
          break;
        case '$40M - $49.99M':
          productList = productList.filter( p=> 40 <= p.price && p.price < 50);
          break;
        case 'Over $50M':
          productList = productList.filter( p=> 50 <= p.price);
          break;
      }
    }
    if(checkYears){
      productList = productList.filter( p=> p.year === checkYears);
    }
    if(checkStyles){
      productList = productList.filter( p=> p.style === checkStyles);
    }
    if(checkSizes){
      productList = productList.filter( p=> p.size === checkSizes);
    }
    if(checkMaterials){
      productList = productList.filter( p=> p.material === checkMaterials);
    }
    if(checkMovements){
      productList = productList.filter( p=> p.movement === checkMovements);
    }
    return productList;
  }




}
