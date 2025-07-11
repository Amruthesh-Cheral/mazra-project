import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../pages/products/service/product.service';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminProductsComponent {
  constructor(
    private _router: Router,
    private _productService: ProductService,
  ) {}

  createProduct() {
    this._router.navigateByUrl('/admin-panel/products/add-products');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.productlist().subscribe(
      response => {
        console.log('Products fetched successfully', response);
      },
      error => {
        // Handle HTTP error
        console.error('HTTP error while fetching products', error);
      }
    );
  }

}
