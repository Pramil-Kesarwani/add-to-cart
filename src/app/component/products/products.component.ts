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
  filterData: any;
  searchKey: string='';

  ngOnInit(): void {
    this.apiService.getProduct().subscribe({
      next: data => {
        this.productList = data;
        this.filterData = data;
        this.productList.forEach((a: any) => {
          if (a.category.toLowerCase().includes('clothing')) {
            a.category = 'fashion';
          }
          Object.assign(a,{quantity:1,total:a.price})
        })
        console.log('productList---', this.productList);
        this.cartService.search.subscribe((res) => {
          this.searchKey = res;
          console.log(this.searchKey);
          
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }
  addToCart(item:any) {
    this.cartService.addToCart(item);
  }

  filter(category: string) {
    this.filterData = this.productList.filter((a:any) => {
      if (a.category == category || category == '') {
        return a;
      }
    })
  }

}
