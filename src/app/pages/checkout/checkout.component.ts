import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule ,ReactiveFormsModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      // Billing
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      address: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      createAccount: [false],

      // Payment
      nameOnCard: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      saveCard: [true]
    });
  }

  submitOrder(): void {
    if (this.checkoutForm.valid) {
      console.log('Order Submitted', this.checkoutForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: 'Thank you for your purchase.',
        confirmButtonText: 'OK'
      });
    } else {
      this.checkoutForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Form Invalid',
        text: 'Please fill all required fields correctly.',
        confirmButtonText: 'OK'
      });
    }
  }

  // helpers for template
  hasError(controlName: string, error: string) {
    return this.checkoutForm.get(controlName)?.hasError(error) && this.checkoutForm.get(controlName)?.touched;
  }
}
