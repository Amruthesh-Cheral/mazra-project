import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  $baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

    productlist() {
      return this.http.get( this.$baseUrl + "/products")
    }

    addProducts(data: any): Observable<any> {
      return this.http.post( this.$baseUrl + "/products", data)
    }
}
