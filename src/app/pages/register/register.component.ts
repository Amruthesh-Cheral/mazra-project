import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../service/dataService/data.service';
import { CommonModule } from '@angular/common';
import { RegisterService } from './service/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

export interface register {
  username: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , HttpClientModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

constructor(private fb: FormBuilder , private router: Router , private registerService:RegisterService ) { }

  registerForm = this.fb.group<register>({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  })

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data:', formData);

      if (formData.password === formData.confirmPassword) {
        // Call the registration service here
        this.registerService.signup(formData).subscribe(res => {
            console.log(res);
            this.router.navigate(['/email-verification']);
          }, error => {
            console.error('Registration failed', error);
            // Handle error, e.g., show a notification
          });
            // this.dataService.customSnackBar("Registration successful", "success", "success");
      } else {
        // this.dataService.customSnackBar("Passwords do not match", "error", "error");
      }
    } else {
      // this.dataService.customSnackBar("Please fill all required fields correctly", "error", "error");
    }
  }

  }
