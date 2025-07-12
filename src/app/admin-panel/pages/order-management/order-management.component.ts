import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent {
 orders = [
    { orderId: 'ORD001', customer: 'Alice', total: 120.50, date: '2025-07-12' },
    { orderId: 'ORD002', customer: 'Bob', total: 230.00, date: '2025-07-11' },
    { orderId: 'ORD003', customer: 'Charlie', total: 90.99, date: '2025-07-10' },
  ];

  editOrder(order: any) {
    console.log('Edit order', order);
    // here you can populate form data
  }

  deleteOrder(orderId: string) {
    if(confirm(`Are you sure to delete order ${orderId}?`)) {
      this.orders = this.orders.filter(o => o.orderId !== orderId);
    }
  }

  saveOrder() {
    console.log('Save new order');
    // you can get values from form controls by template reference or reactive forms
    alert('Order saved (dummy)');
  }
}
