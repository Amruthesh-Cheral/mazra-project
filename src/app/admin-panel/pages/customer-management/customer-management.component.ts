import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.scss'
})
export class CustomerManagementComponent {
customers = [
    { id: 'CUST001', name: 'Alice Johnson', email: 'alice@example.com', phone: '1234567890', registered: '2025-07-01' },
    { id: 'CUST002', name: 'Bob Smith', email: 'bob@example.com', phone: '2345678901', registered: '2025-07-05' },
    { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', phone: '3456789012', registered: '2025-07-10' },
  ];

  editCustomer(customer: any) {
    console.log('Editing customer:', customer);
    alert(`Edit customer: ${customer.name} (dummy action)`);
  }

  deleteCustomer(id: string) {
    if (confirm(`Are you sure you want to delete customer ${id}?`)) {
      this.customers = this.customers.filter(c => c.id !== id);
    }
  }
}
