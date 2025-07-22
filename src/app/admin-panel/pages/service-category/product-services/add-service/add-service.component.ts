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
  imports: [NgIf, ReactiveFormsModule , NgFor],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {
serviceForm!: FormGroup;
  images: File[] = [];
  previewImages: string[] = [];
  imageLimitExceeded = false;
  videos: File[] = [];
  previewVideos: string[] = [];
  videoLimitExceeded = false;
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
      subdescription: ['', Validators.required],
      subhead: ['', Validators.required],
      image: [null],
      video: [null]
    });
  }

  get f() {
    return this.serviceForm.controls;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];

    if (files.length > 5) {
      this.imageLimitExceeded = true;
      return;
    }

    this.imageLimitExceeded = false;
    this.images = files;
    this.previewImages = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.previewImages.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  onVideoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? Array.from(input.files) : [];

    if (file.length > 5) {
      this.videoLimitExceeded = true;
      return;
    }

    this.videoLimitExceeded = false;
    this.videos = file;
    this.previewVideos = [];

    file.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.previewVideos.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    // const file = (event.target as HTMLInputElement)?.files?.[0];
    // if (file) {
    //   this.selectedVideoFile = file;
    //   const reader = new FileReader();
    //   reader.onload = () => (this.previewVideo = reader.result as string);
    //   reader.readAsDataURL(file);
    // }
  }

  onSubmit() {
    if (this.serviceForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.serviceForm.value.name);
    formData.append('description', this.serviceForm.value.description);
    formData.append('subdescription', this.serviceForm.value.subdescription);
    formData.append('subhead', this.serviceForm.value.subhead);
    // formData.append('category', this.serviceForm.value.category);

    this.images.forEach((file, index) => {
      formData.append(`image`, file);
    });

    this.videos.forEach((file, index) => {
      formData.append(`video`, file);
    });

    // if (this.selectedVideoFile) {
    //   formData.append('video', this.selectedVideoFile);
    // }

    // Call the service to add the service
    this.productService.addService(formData).subscribe({
      next: (response) => {
        console.log('Service added successfully', response);
        if(response && response.success) {
        Swal.fire({
          title: 'Success',
          text: response?.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this._router.navigate(['/admin-panel/service-category']);
        }
        // Optionally, reset the form or navigate to another page
        this.serviceForm.reset();
        this.previewImages = [];
        this.previewVideo = null;

        this.imageInputRef.nativeElement.value = '';
        this.videoInputRef.nativeElement.value = '';

      },
      error: (error) => {
        console.error('Error adding service', error);
        Swal.fire({
          title: 'Error',
          text: error?.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });


    // TODO: Call service to POST formData
    console.log('Submitting form...', formData);
  }
}
