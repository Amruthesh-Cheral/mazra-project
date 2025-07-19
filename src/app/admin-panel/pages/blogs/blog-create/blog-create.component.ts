import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [FormsModule, RouterModule , CommonModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.scss'
})
export class BlogCreateComponent {


  blog = {
    title: '',
    author: '',
    date: '',
    category: '',
    image: '',
    content: ''
  };

  constructor(private router: Router) { }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.blog.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  submitBlog() {
    console.log('Blog submitted:', this.blog);
    // Call service here to save blog
    this.router.navigate(['/admin-panel/blog']);
  }

}
