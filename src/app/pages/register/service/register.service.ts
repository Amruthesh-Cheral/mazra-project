import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  $baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

    signup(data: any) {
      return this.http.post( this.$baseUrl + "/auth/signup", data)
    }
}
