import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, RouterModule ,FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrl: './blog-management.component.scss'
})
export class BlogManagementComponent {
  constructor(private router: Router) { }


  blogs: BlogPost[] = [
    {
      id: 1,
      image: 'assets/images/blog/blog-details-1-1.jpg',
      title: 'This Leader in Organic Agriculture Growth',
      author: 'Lorat',
      date: '02 Sep 2024',
      category: 'Organic',
      content: `There are many variations of passages agency we have covered many special events such as
      fireworks, fairs, parades, races, walks, a Lorem Ipsum Fasts injecte dedicated product design
      team can help you achieve your business goals...`,
    },
    {
      id: 2,
      image: 'assets/images/blog/blog-details-1-1.jpg',
      title: 'Sustainable Farming Practices for the Future',
      author: 'Admin',
      date: '10 Aug 2024',
      category: 'Agriculture',
      content: `This article discusses sustainable practices in modern farming and how these techniques
      can be scaled globally for better yield.`,
    },
    {
      id: 3,
      image: 'assets/images/blog/blog-details-1-1.jpg',
      title: 'Exploring Eco-Friendly Techniques',
      author: 'John Doe',
      date: '21 Jul 2024',
      category: 'Environment',
      content: `Explore different eco-friendly approaches to traditional agricultural methods.`,
    },
    {
      id: 4,
      image: 'assets/images/blog/blog-details-1-1.jpg',
      title: 'Market Trends in Organic Produce',
      author: 'Jane Smith',
      date: '15 Jun 2024',
      category: 'Market',
      content: `How market demand is shaping the organic produce industry in 2024.`,
    }
  ];

  createBlog() {
    // Swal.fire('Create Blog', 'This would open a create blog modal (dummy).', 'info');
    this.router.navigate(['/admin-panel/blogs/blogs-create']);

  }

  editBlog(blog: BlogPost) {
    Swal.fire('Edit Blog', `Editing blog "${blog.title}" (dummy).`, 'info');
  }

  deleteBlog(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        this.blogs = this.blogs.filter(blog => blog.id !== id);
        Swal.fire('Deleted!', 'Your blog post has been deleted.', 'success');
      }
    });
  }
}

interface BlogPost {
  id: number;
  image: string;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
}