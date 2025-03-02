import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../assets/types/product.type";
import {ActiveParamsType} from "../../../../assets/types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: ProductType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  pages: number[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data.items;
      });

    // this.activatedRoute.queryParams
    //   .subscribe(params => {
    //     this.activeParams = ActiveParamsUtil.processParams(params);
    //     this.appliedFilters = [];
    //     this.activeParams.categories.forEach(url => {
    //
    //       for (let i = 0; i < this.categoriesWithTypes.length; i++) {
    //         const foundType = this.categoriesWithTypes[i].types.find(type => type.url === url);
    //         if (foundType) {
    //           this.appliedFilters.push({
    //             name: foundType.name,
    //             urlParam: foundType.url
    //           });
    //         }
    //       }
    //     });
  }

  openPage(page: number) {
    this.activeParams.page = page;

    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }


}
