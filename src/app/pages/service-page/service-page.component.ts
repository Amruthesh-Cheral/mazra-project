import { Component } from '@angular/core';
import { ProductServicesService } from '../../admin-panel/pages/service-category/product-services/service/product-services.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from '../../admin-panel/pages/service-category/product-category/service/product-category.service';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  categorys:any[]=[];
  constructor(
    private productService: ProductServicesService,
    private _activatedRoute: ActivatedRoute,
    private categoryService: ProductCategoryService
  ){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data:any)=>{
      console.log(data?.id);
      this.serviceDetail(data?.id);
      this.getCategoriesofService(data?.id)
    })
  }

  serviceDetail(id:string){
    this.productService.getService(id)
    .subscribe((res:any)=>{
      console.log(res);
    })
  }

  getCategoriesofService(id:any) {
    this.categoryService.getCategoryById(id).subscribe({
        next: (res: any) => {
          this.categorys = res?.data || [];
        },
        error:( err:any)=> {
          console.error('Category fetch error', err);
        }
    });
  }

}
