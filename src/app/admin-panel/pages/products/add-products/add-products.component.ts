import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {
productForm: FormGroup;
  images: File[] = [];
  previewImages: string[] = [];
  imageLimitExceeded = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discountPercent: [null],
      category: ['', Validators.required],
    });
  }

  get f() {
    return this.productForm.controls;
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

  onSubmit() {
    if (this.productForm.invalid || this.imageLimitExceeded) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('discountPercent', this.productForm.value.discountPercent || '');
    formData.append('category', this.productForm.value.category);

    this.images.forEach((file, index) => {
      formData.append('images', file);
    });

    // Replace this with your API call
    console.log('Form data ready for submission', formData);
  }
}
