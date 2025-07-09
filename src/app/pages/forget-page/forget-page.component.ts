import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtpPageComponent } from '../otp-page/otp-page.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forget-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './forget-page.component.html',
  styleUrl: './forget-page.component.scss'
})
export class ForgetPageComponent {
  dialog = inject(MatDialog);

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
      this.dialog.open(OtpPageComponent, {
        width: '400px',
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
