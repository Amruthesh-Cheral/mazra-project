import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  $baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  addToCart(data: any) {
    return this.http.post(this.$baseUrl + "/cart/add", data)
  }

  cartList() {
    return this.http.get( this.$baseUrl + "/cart")
  }

  removeItem(id: string) {
    return this.http.delete(this.$baseUrl + "/cart/remove/" + id)
  }

  updateCartItemQuanity(id: string, data: any) {
    return this.http.put(this.$baseUrl + "/cart/update/:productId" + id, data)
  }
}
