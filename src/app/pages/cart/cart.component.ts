import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit  {

   productId: string | null = null;
  quantity: number = 1;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product_id');
      this.quantity = +(params.get('quantity') || 1);
    });
    console.log('Product ID:', this.productId);
    console.log('Quantity:', this.quantity);
    
  }

}
