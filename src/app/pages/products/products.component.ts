import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe ,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products:any[] = [];

  constructor(private productService: ProductService ) { }

  ngOnInit(): void {
    this.getProductlist();
  }

//   products = [
//   { id: 1, name: 'Mazra Bag 3', price: 10.00, image: 'assets/images/products/mazra-bag-3.jpeg', offer: '20% Off' },
//   { id: 2, name: 'Mazra Bag 2', price: 11.00, image: 'assets/images/products/mazra-bag-2.jpeg', offer: null },
//   { id: 3, name: 'Mazra Bag 3', price: 10.00, image: 'assets/images/products/mazra-bag-3.jpeg', offer: '20% Off' },
//   { id: 4, name: 'Mazra Bag 4', price: 12.00, image: 'assets/images/products/mazra-bag-4.jpeg', offer: null }
// ];

  getProductlist() {
    // This method would typically call a service to fetch products from an API
    // For now, we are using a static list defined above

    this.productService.productlist().subscribe((res: any) => {
      // this.products = data;
      console.log(res);
      this.products = res.data;

    }, error => {
      console.error('Error fetching product list:', error);
    });

    console.log('Product list fetched:', this.products);
  }


}
