import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../pages/products/service/product.service';
import Swal from 'sweetalert2';
import { ProductServicesService } from '../service/product-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {
serviceForm!: FormGroup;
  previewImage: string | null = null;
  previewVideo: string | null = null;
  selectedImageFile?: File;
  selectedVideoFile?: File;

  @ViewChild('imageInput') imageInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput') videoInputRef!: ElementRef<HTMLInputElement>;

  // categoryOptions: string[] = ['Residential', 'Commercial', 'Agricultural'];

  constructor(private fb: FormBuilder , private productService: ProductServicesService, private _router:Router) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // category: ['', Validators.required],
      image: [null],
      video: [null]
    });
  }

  get f() {
    return this.serviceForm.controls;
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onVideoChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedVideoFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewVideo = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.serviceForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.serviceForm.value.name);
    formData.append('description', this.serviceForm.value.description);
    // formData.append('category', this.serviceForm.value.category);

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    if (this.selectedVideoFile) {
      formData.append('video', this.selectedVideoFile);
    }

    // Call the service to add the service
    this.productService.addService(formData).subscribe({
      next: (response) => {
        console.log('Service added successfully', response);
        // Optionally, reset the form or navigate to another page
        this.serviceForm.reset();
        this.previewImage = null;
        this.previewVideo = null;

        this.imageInputRef.nativeElement.value = '';
        this.videoInputRef.nativeElement.value = '';

        Swal.fire({
          title: 'Success',
          text: response?.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this._router.navigateByUrl('admin-panel/service-category')
      },
      error: (error) => {
        console.error('Error adding service', error);
        Swal.fire({
          title: 'Error',
          text: error?.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });


    // TODO: Call service to POST formData
    console.log('Submitting form...', formData);
  }
}
