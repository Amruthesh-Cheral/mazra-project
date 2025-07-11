import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { NgClass } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [AdminSidebarComponent, NgClass, RouterModule],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {
  isSidebarCollapsed = false;

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
