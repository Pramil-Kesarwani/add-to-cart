import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private apiService:ApiService,private cartService:CartService) { }

  productList: any;

  ngOnInit(): void {
    this.apiService.getProduct().subscribe({
      next: data => {
        this.productList = data;
        this.productList.forEach((a:any) => {
          Object.assign(a,{quantity:1,total:a.price})
        })
        console.log('productList---',this.productList);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  addToCart(item:any) {
    this.cartService.addToCart(item);
  }

}
