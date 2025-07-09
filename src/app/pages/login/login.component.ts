import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../service/dataService/data.service';


export interface login {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {

constructor(private fb: FormBuilder , private dataService:DataService) { }

  loginForm = this.fb.group<login>({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  })

  ngOnInit(): void {}

  onSubmit() {
    this.dataService.customSnackBar('Active group is deleted by admin', 'Group Deleted', 'success');
    console.log('Form Submitted!', this.loginForm.value);
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Here you can handle the form submission, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }
  }

}
