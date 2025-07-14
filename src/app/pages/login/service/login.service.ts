import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  $baseUrl = environment.baseUrl

    public islogin = new BehaviorSubject<boolean>(true);
    islogin$ = this.islogin.asObservable();

  constructor(private http: HttpClient) { }

    login(data: any) {
      return this.http.post( this.$baseUrl + "/auth/signin", data)
    }
}
