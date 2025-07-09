import { Component } from '@angular/core';
import { DecimalPipe, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe ,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


  products = [
  { id: 1, name: 'Mazra Bag 3', price: 10.00, image: 'assets/images/products/mazra-bag-3.jpeg', offer: '20% Off' },
  { id: 2, name: 'Mazra Bag 2', price: 11.00, image: 'assets/images/products/mazra-bag-2.jpeg', offer: null },
  { id: 3, name: 'Mazra Bag 3', price: 10.00, image: 'assets/images/products/mazra-bag-3.jpeg', offer: '20% Off' },
  { id: 4, name: 'Mazra Bag 4', price: 12.00, image: 'assets/images/products/mazra-bag-4.jpeg', offer: null }
];



}
