import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _route: ActivatedRoute
  ) {}

  createProduct() {
    this._router.navigateByUrl('/admin-panel/products/add-products');
  }
}
