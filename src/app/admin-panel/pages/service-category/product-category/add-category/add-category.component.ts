import { NgIf } from '@angular/common';
import { ProductCategoryService } from './../service/product-category.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductServicesService } from '../../product-services/service/product-services.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
categoryForm!: FormGroup;
  previewImage: string | null = null;
  previewVideo: string | null = null;
  selectedImageFile?: File;
  selectedVideoFile?: File;

  categoryOptions: any[] = [];
  @ViewChild('imageInput') imageInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput') videoInputRef!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder , private categoryService: ProductCategoryService , private productService: ProductServicesService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      service: ['', Validators.required],
      image: [null],
      video: [null]
    });
    this.getserviceList();
  }

  getserviceList() {
    this.productService.getServiceList().subscribe({
      next: (response:any) => {
        console.log('Service list fetched successfully', response);
        this.categoryOptions = response?.data;
        console.log(this.categoryOptions);

        // Handle the response as needed
      },
      error: (error) => {
        console.error('Error fetching service list', error);
        Swal.fire({
          title: 'Error',
          text: error?.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  get f() {
    return this.categoryForm.controls;
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
    if (this.categoryForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description);
    formData.append('service', this.categoryForm.value.service);

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    if (this.selectedVideoFile) {
      formData.append('video', this.selectedVideoFile);
    }

    // Call the service to add the service
    this.categoryService.addCategory(formData).subscribe({
      next: (response) => {
        console.log('Service added successfully', response);
        // Optionally, reset the form or navigate to another page
        this.categoryForm.reset();
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
