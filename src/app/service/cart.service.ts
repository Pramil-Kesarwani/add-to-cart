import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  baseUrl = 'https://fakestoreapi.com/products';
  
  // cartItemList: Array<String>= [];
  // cartItemList: string[] = [];
  cartItemList: any[] = [];
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }
  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
  }
  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    console.log("cartItemList---",this.cartItemList);
    console.log('productList---',this.productList);
    
    this.getTotalPrice();
  }
  getTotalPrice():number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any,itemIndex:number) {
    this.cartItemList.map((a: any, index: number) => {
      if (product.id == a.id && itemIndex == index) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  // sendSearchTerms(value: string) {
  //   console.log("search terms value---",value);
    
  //   this.search.next(value);
  // }
}
