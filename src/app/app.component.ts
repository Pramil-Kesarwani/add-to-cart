import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'add-to-cart';
  ismenurequired = false;
  constructor(private router:Router){}
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl=='/login' || currentUrl=='/signup'){
      this.ismenurequired = false;
    }
    else{
      this.ismenurequired = true;
    }
  }

  
}
