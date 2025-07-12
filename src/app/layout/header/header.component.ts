import { CartService } from './../../pages/cart/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule , MatMenuModule , MatMenuModule , MatButtonModule , MatIconModule, MatDividerModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  itemCount: number = 0;
  username:string = '';
  email:string = '';

  constructor( private route:Router , private CartService: CartService) { }

  ngOnInit() {
    this.CartService.cartItemCount$.subscribe(count => {
      console.log('Cart item count updated:', count);

      this.itemCount = count;
    });

    // Also load once on init
    this.CartService.refreshCartCount();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user?.username;
    this.email = user?.email;
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
  }

}
