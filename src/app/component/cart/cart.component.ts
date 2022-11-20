import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  product:any[] = [];
  grandTotal !: number;
  
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: data => {
        this.product = data;
        console.log(this.product);
        this.grandTotal = this.cartService.getTotalPrice();
      },
      error: err => {
        console.log(err);
        
      }
    })
  }
  removeItem(item: any,index:number) {
    this.cartService.removeCartItem(item, index);
  }
  emptyCard() {
    this.cartService.removeAllCart();
  }

}
