import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../admin-panel/pages/blogs/service/blog.service';
import { NgFor } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  blogDetails: any[] = []; // Initialize as an empty array
  constructor(private router: Router, private blogService: BlogService) { }
  @ViewChild('mainCarousel') mainCarousel!: ElementRef;
  @ViewChild('thumbCarousel') thumbCarousel!: ElementRef;
  @ViewChild('projectCarousel') projectCarousel!: ElementRef;
  @ViewChild('blogCarousel') blogCarousel!: ElementRef;

  projectSlides = [
    {
      title: 'Residential',
      link: '/residential',
      img: '../assets/images/pintrest/Image_2.png.jpg'
    },
    {
      title: 'Commercial',
      link: '/commercial',
      img: '../assets/images/pintrest/agri2.jpg'
    },
    {
      title: 'Industrial',
      link: '/industrial',
      img: '../assets/images/pintrest/indr4.jpg'
    },
    {
      title: 'Institutional',
      link: '/institutional',
      img: '../assets/images/pintrest/school2.jpg'
    }
  ];

  testimonials = [
    {
      quote: `Partnering with Mazra Care has been a turning point in our sustainability journey.`,
      name: "Mike Hardson",
      designation: "Customer",
      img: "../assets/images/team/person.jpeg"
    },
    {
      quote: `Mazra Care embodies the future of food security in the UAE.`,
      name: "Joseph Kennedy",
      designation: "Founder",
      img: "../assets/images/team/person.jpeg"
    },
    {
      quote: `Thanks to Mazra Care’s adaptable systems, we now grow fresh vegetables...`,
      name: "Mark Smith",
      designation: "Manager",
      img: "../assets/images/team/person.jpeg"
    },
    {
      quote: `As a mother, I was worried about the safety of store-bought vegetables.`,
      name: "Amelia Rose",
      designation: "Parent",
      img: "../assets/images/team/person.jpeg"
    }
  ];
  ngOnInit() {
    // Any initialization logic can go here
    this.loadBlogs();


  }
  ngAfterViewInit(): void {
    // jQuery Slick Init
    const $main = $(this.mainCarousel.nativeElement);
    const $thumb = $(this.thumbCarousel.nativeElement);

    $main.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      autoplay: true,
      infinite: true,
      asNavFor: $thumb
    });

    $thumb.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: $main,
      dots: false,
        arrows: false,
      centerMode: true,
      focusOnSelect: true,
      infinite: true,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });

    $(this.projectCarousel.nativeElement).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      dots: false,
      arrows: false,
      speed: 700,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    $(this.blogCarousel.nativeElement).slick({
       slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      dots: false,
      arrows: false,
      speed: 700,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (response: any) => {
        console.log('Blogs loaded:', response);
        this.blogDetails = response?.data || []; // Ensure it's an array
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
      }
    });
  }

  // testimonials = [
  //   {
  //     rating: 5,
  //     quote: 'Partnering with Mazra Care has been a turning point in our sustainability journey...',
  //     name: 'Mike Hardson',
  //     designation: 'Customer',
  //     image: '../assets/images/team/person.jpeg'
  //   },
  //   {
  //     rating: 5,
  //     quote: 'Mazra Care embodies the future of food security in the UAE...',
  //     name: 'Joseph Kennedy',
  //     designation: 'Founder',
  //     image: '../assets/images/team/person.jpeg'
  //   },
  //   {
  //     rating: 5,
  //     quote: 'Thanks to Mazra Care’s adaptable systems, we now grow fresh vegetables...',
  //     name: 'Mike Hardson',
  //     designation: 'Customer',
  //     image: '../assets/images/team/person.jpeg'
  //   },
  //   {
  //     rating: 5,
  //     quote: 'As a mother, I was worried about the safety of store-bought vegetables...',
  //     name: 'Joseph Kennedy',
  //     designation: 'Founder',
  //     image: '../assets/images/team/person.jpeg'
  //   },
  //   {
  //     rating: 5,
  //     quote: 'We rely on Mazra Care’s farms for ultra-fresh, pesticide-free greens...',
  //     name: 'Mike Hardson',
  //     designation: 'Customer',
  //     image: '../assets/images/team/person.jpeg'
  //   },
  //   {
  //     rating: 5,
  //     quote: 'What attracted me to invest in Mazra Care was their scalable, impact-driven model...',
  //     name: 'Mark Smith',
  //     designation: 'Manager',
  //     image: '../assets/images/team/person.jpeg'
  //   }
  // ];


  mainSliderConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.testimonials-two__carousel-thumb',
  autoplay: true,
  infinite: true,
  dots: false,
  arrows: false,
  autoplaySpeed: 5000,
  centerPadding: 0
};

thumbSliderConfig = {
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.testimonials-two__carousel',
  centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  infinite: true,
  dots: false,
  arrows: false,
  centerPadding: 0,
  responsive: [
    {
      breakpoint: 501,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
};

 projects = [
    {
      title: 'Residential',
      link: '/residential',
      image: '../assets/images/pintrest/Image_2.png.jpg'
    },
    {
      title: 'Commercial',
      link: '/commercial',
      image: '../assets/images/pintrest/agri2.jpg'
    },
    {
      title: 'Industrial',
      link: '/industrial',
      image: '../assets/images/pintrest/indr4.jpg'
    },
    {
      title: 'Institutional',
      link: '/institutional',
      image: '../assets/images/pintrest/school2.jpg'
    }
  ];

  customOptions = {
    loop: false,
    margin: 30,
    smartSpeed: 700,
    nav: false,
    dots: true,
    autoplay: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  };





  blogPosts = [
    {
      title: 'Agriculture is Important same as Education',
      image: '../assets/images/blog/blog-1-1.jpg',
      admin: 'Sam',
      comments: 5,
      description: `Let kids get their hands dirty while learning about sustainable farming and healthy eating. It's all
        about inspiring curiosity, teaching responsibility.`,
      srText: 'Cultivating a Greener Future with Mazra Care’s Smart Farming Solutions'
    },
    {
      title: "Why Mazra Care Rock's for students",
      image: '../assets/images/blog/blog-1-2.jpg',
      admin: 'Alex',
      comments: 9,
      description: `Connecting with the environment in a fun & interactive way. Hands-on lessons in sustainable farming.
        Learning about food and where it comes from.`,
      srText: 'Empowering Communities Through Agriculture and Wellness'
    },
    {
      title: 'Boost your Farm with Quality Products',
      image: '../assets/images/blog/blog-1-3.jpg',
      admin: 'Sam',
      comments: 5,
      description: `Learn proven strategies to increase your revenue. Mazra Care offers pure, organic
        alternatives for skincare, nutrition, and personal care—all made sustainably.`,
      srText: 'Pure, Ethical, and Powerful: The Mazra Care Wellness Revolution'
    }
  ];

  blogCarouselOptions = {
    loop: false,
    margin: 30,
    smartSpeed: 700,
    nav: false,
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };



}
