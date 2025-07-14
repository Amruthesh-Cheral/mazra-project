import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  $baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  addToWishlist(data: any) {
    return this.http.post(this.$baseUrl + "/wishlist/", data)
  }

  getWishlist() {
    return this.http.get( this.$baseUrl + "/wishlist")
  }

  removeItem(id: string) {
    return this.http.delete(this.$baseUrl + "/wishlist/" + id)
  }

  clearWishlist() {
    return this.http.delete(this.$baseUrl + "/wishlist")
  }
}
