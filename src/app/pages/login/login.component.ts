import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../service/dataService/data.service';
import { NotifierModule, NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2'
import { RouterModule } from '@angular/router';


export interface login {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotifierModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder, private dataService: DataService, notifierService: NotifierService) {
    this.notifier = notifierService;

  }

  loginForm = this.fb.group<login>({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  })

  ngOnInit(): void { }

  onSubmit() {
    // this.dataService.customSnackBar('Active group is deleted by admin', 'Group Deleted', 'success');
    // this.notifier.notify('success', 'You are awesome! I mean it!');
    Swal.fire("SweetAlert2 is working!");

    // console.log('Form Submitted!', this.loginForm.value);
    if (this.loginForm.valid) {
      // console.log('Form Submitted!', this.loginForm.value);
      // this.notifier.notify('success', 'You are awesome! I mean it!');

      // Here you can handle the form submission, e.g., send data to a server
    } else {
      console.log('Form is invalid');
    }
  }

}
