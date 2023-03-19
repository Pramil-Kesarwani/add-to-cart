import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseUrl = 'https://fakestoreapi.com/products';
  // baseUrl = 'https://api.escuelajs.co/api/v1/products';

  getProduct() {
    return this.http.get(this.baseUrl)
      .pipe(map((res: any) => {
        return res;
    }))
  }
}
