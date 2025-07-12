import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent {
@Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      route: '/admin-panel/dashboard',
      isOpen: false,
      // children: [
      //   { icon: 'fas fa-chart-pie', label: 'Analytics' },
      //   { icon: 'fas fa-tasks', label: 'Projects' },
      // ]
    },
    {
      icon: 'fas fa-box',
      label: 'Products',
      route: '/admin-panel/products',
      isOpen: false,
    },
    {
      icon: 'fa fa-shopping-cart',
      label: 'Order',
      route: '/admin-panel/order',
      isOpen: false,
    },
    {
      icon: 'fa fa-users',
      label: 'Customers',
      route: '/admin-panel/customers',
      isOpen: false,
    },
    {
      icon: 'fas fa-money-bill-wave',
      label: 'Report / Payments',
      route: '/admin-panel/report-payments',
      isOpen: false,
    },
    {
      icon: 'fa fa-book',
      label: 'Blog',
      route: '/admin-panel/blog',
      isOpen: false,
    },
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(i: number) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed) {
      this.menuItems[i].isOpen = !this.menuItems[i].isOpen;
    }
  }
}

interface MenuItem {
  icon: string;
  label: string;
  isOpen?: boolean;
  children?: any[];
  route?: string; // Optional route for navigation
}