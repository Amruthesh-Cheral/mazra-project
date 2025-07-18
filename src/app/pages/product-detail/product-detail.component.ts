import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductDetailsService } from './service/product-details.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  slug: string | null = null;
  product: any;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private productDetailservice: ProductDetailsService, private router: Router, private cartService: CartService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('id');
      console.log('Product ID:', this.slug);
    });

    this.getProductDetails();
  }
  getProductDetails() {
    // This method would typically call a service to fetch product details by ID
    // For now, we are just logging the ID
    console.log('Fetching details for product ID:', this.slug);
    if (this.slug) {
      this.productDetailservice.productDetails(this.slug).subscribe((res: any) => {
        console.log('Product Details:', res);
        // Handle the product details response
        this.product = res.data;
      }, error => {
        // Handle error, e.g., show a notification
        console.log('Error fetching product details:', error);

        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error fetching product details:', error);
      });
    } else {
      console.error('No product ID provided');
    }
  }


  increase() {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onInputChange(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.quantity = value >= 1 && value <= 99 ? value : 1;
  }

  addTocart(product: any) {
    console.log('Adding to cart:', product, 'Quantity:', this.quantity);


    if (!localStorage.getItem('token')) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to view your cart. Are you sure you want to login?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);

        }

      })
    } else {
      this.cartService.addToCart({
        productId: product._id,
        quantity: this.quantity
      }).subscribe((res: any) => {
        console.log('Product added to cart:', res);
        Swal.fire({
          title: 'Added to Cart',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/cart']);
      }, error => {
        console.error('Error adding product to cart:', error);
        Swal.fire({
          title: 'Error',
          text: error?.error?.message || 'Failed to add product to cart',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }
  }

  buyNow(product: any) {
    console.log('Buying now:', product, 'Quantity:', this.quantity);
    if (!localStorage.getItem('token')) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to proceed with the purchase.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Navigate to the checkout page with the product details with quantity
      this.router.navigate(['/checkout'], {
        queryParams: {
          productId: product._id,
          quantity: this.quantity
        }
      });
    }
  }

}
