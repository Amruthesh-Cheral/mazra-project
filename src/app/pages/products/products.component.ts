import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgIf, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from './service/product.service';
import { CartService } from '../cart/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe ,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products:any[] = [];

  constructor(private productService: ProductService, private cartService: CartService , private route: Router ) { }

  ngOnInit(): void {
    this.getProductlist();
  }


  getProductlist() {
    this.productService.productlist().subscribe((res: any) => {
      console.log(res);
      this.products = res.data;
    }, error => {
      console.error('Error fetching product list:', error);
    });

    console.log('Product list fetched:', this.products);
  }

  addToCart(id: string) {
    // Logic to add a product to the cart
    console.log('Add to cart clicked');
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to add this product to the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.addToCart({
          productId: id,
          quantity: 1
        }).subscribe((res: any) => {
          console.log('Product added to cart:', res);
          Swal.fire({
            title: 'Added!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // this.route.navigate(['/cart']);
        }, error => {
          Swal.fire({
            title: 'Error',
            text: error?.error?.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });
  }


}
