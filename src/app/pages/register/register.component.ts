import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../service/dataService/data.service';
import { CommonModule } from '@angular/common';

export interface register {
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

constructor(private fb: FormBuilder , private dataService:DataService) { }

  registerForm = this.fb.group<register>({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  })

  ngOnInit(): void {}

  onSubmit() {}

  }
