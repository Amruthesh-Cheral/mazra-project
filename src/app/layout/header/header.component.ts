import { CartService } from './../../pages/cart/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../pages/login/service/login.service';
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

  constructor( private route:Router , private CartService: CartService , private authService: LoginService) { }

  ngOnInit() {
    this.CartService.cartItemCount$.subscribe(count => {
      this.itemCount = count;
    });

    // Check if user is logged in
    this.authService.islogin$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log('User is logged in:', isLoggedIn);
      console.log(JSON.parse(localStorage.getItem('user') || '{}').username)
      if (isLoggedIn) {
        this.username = JSON.parse(localStorage.getItem('user') || '{}').username || '';
        this.email = JSON.parse(localStorage.getItem('user') || '{}').email || '';
      } else {
        this.username = '';
        this.email = '';
      }
      this.isAdmin = JSON.parse(localStorage.getItem('user') || '{}').role === 'Admin';
      console.log('User role:', this.isAdmin);
    });

    // Also load once on init
    this.CartService.refreshCartCount();
  }

  goToCart(){
    if(this.itemCount > 0 && localStorage.getItem('token')) {
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
    this.route.navigate(['/login']);
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.isLoggedIn = false;
  }

}
