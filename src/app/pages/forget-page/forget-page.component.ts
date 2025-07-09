import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-page',
  standalone: true,
    imports: [ReactiveFormsModule , CommonModule ],
  templateUrl: './forget-page.component.html',
  styleUrl: './forget-page.component.scss'
})
export class ForgetPageComponent {

    loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Submitted:', this.loginForm.value);
      // You can call your API here to send reset link
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
