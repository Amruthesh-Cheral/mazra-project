import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductCategoryService } from '../../service-category/product-category/service/product-category.service';
import { BlogService } from '../service/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule , CommonModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.scss'
})
export class BlogCreateComponent implements OnInit {

  blogForm!: FormGroup;
  previewImage: string | null = null;
  selectedImageFile?: File;
  categorys:any [] = [];

  constructor(private fb: FormBuilder , private router: Router, private categoryService: ProductCategoryService , private blogService: BlogService)
  {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      // date: ['', Validators.required],
      category: ['', Validators.required],
      excerpt: ['', Validators.required],
      content: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  get f() {
    return this.blogForm.controls;
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe({
      next: (response:any) => {
        console.log('Category list fetched successfully', response);
        this.categorys = response?.data;
        console.log(this.categorys);
      },
      error: (error) => {
        console.error('Error fetching category list', error);
      }
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result as string);
      reader.readAsDataURL(file);
    }
  }


  submitBlog() {
    if (this.blogForm.valid) {
      console.log(this.blogForm.value);

      const formData = new FormData();
      formData.append('title', this.blogForm.value.title);
      formData.append('author', this.blogForm.value.author);
      formData.append('category', this.blogForm.value.category);
      formData.append('excerpt', this.blogForm.value.excerpt);
      formData.append('content', this.blogForm.value.content);
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile);
      }
      // Handle form submission
      // For example, you can send the form data to your backend service
      this.blogService.addBlog(this.blogForm.value).subscribe({
        next: (response:any) => {
          console.log('Blog created successfully', response);
          // Show success message and redirect
          if(response && response.success) {
            Swal.fire({
              title: 'Success',
              text: response?.message ,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          this.router.navigate(['/admin-panel/blog']);
        }
          this.blogForm.reset();
          this.previewImage = null;
          this.selectedImageFile = undefined;
        },
        error: (error:any) => {
          console.error('Error creating blog', error);
          Swal.fire({
            title: 'Error',
            text: error?.error?.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
      this.router.navigate(['/admin-panel/blog']);
    }
  }

}
