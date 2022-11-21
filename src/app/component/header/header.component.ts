import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalItem!: number;
  searchTerm: string = '';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: data => {
        this.totalItem = data.length;
        console.log(this.totalItem);
        
      }
    })
  }

  search(event: any) {
    // console.log(event.target);
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    // this.cartService.sendSearchTerms(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
