import { LoginService } from './../../pages/login/service/login.service';
import { CartService } from './../../pages/cart/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ProductServicesService } from '../../admin-panel/pages/service-category/product-services/service/product-services.service';
import { LoaderService } from '../../core/services/loader.service';
import { filter, take } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule , MatMenuModule , MatMenuModule , MatButtonModule , MatIconModule, MatDividerModule , CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  itemCount: number = 0;
  username:string = '';
  email:string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  service:any;
  constructor( private route:Router , private CartService: CartService , private authService: LoginService,
    private productService:ProductServicesService , private loaderService:LoaderService , ) { }

  // ngOnInit() {
  //   this.authService.islogin$
  //     .pipe(
  //       filter(isLogin => isLogin && !!localStorage.getItem('token')), // Wait until logged in AND token exists
  //       take(1) // Only react to first valid login
  //     )
  //     .subscribe(() => {
  //       const user = JSON.parse(localStorage.getItem('user') || '{}');
  //       this.username = user.username || '';
  //       this.email = user.email || '';
  //       this.isAdmin = user.role === 'Admin';

  //       console.log('Username:', this.username);
  //       console.log('Email:', this.email);
  //       console.log('User role:', this.isAdmin);

  //       // Subscribe to cart count
  //       this.CartService.cartItemCount$.subscribe(count => {
  //         this.itemCount = count || 0;
  //       });
  //       this.CartService.refreshCartCount();
  //     });

  //   this.getServices();
  // }
  ngOnInit() {
  this.authService.currentUser$.subscribe(user => {
    this.username = user?.username || '';
    this.email = user?.email || '';
    this.isAdmin = user?.role === 'Admin';
  });

  // this.authService.islogin$
  //   .pipe(filter(isLogin => isLogin && !!localStorage.getItem('token')), take(1))
  //   .subscribe(() => {
  if (localStorage.getItem('token')) {
      this.CartService.cartItemCount$.subscribe(count => {
        this.itemCount = count || 0;
      });
      this.CartService.refreshCartCount();
    // });
  }
  this.getServices();
}

  goToCart(){
    if(this.itemCount >= 0 && localStorage.getItem('token')) {
      this.route.navigate(['/cart']);
    }else if(this.itemCount === 0 && localStorage.getItem('token')) {
      Swal.fire({
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add items to your cart.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      this.route.navigate(['/']);
    }else {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to view your cart. Are you sure you want to login?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['/login']);
        }

      });
    }
  }

  logout() {
    localStorage.clear();
    this.loaderService.hide();
    this.CartService.cartItemCount.next(0);
    this.authService.islogin.next(false);
    this.authService.currentUserSubject.next(null);
    this.username =''
    this.email = '';
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.isLoggedIn = false;
  }

  getServices() {
    this.productService.getServiceList().subscribe(
      (response:any) => {
        console.log(response);
        this.service = response?.data;
      }
    );
  }

  gotoService(id:string){
    this.route.navigateByUrl('service/'+id)
  }
}
