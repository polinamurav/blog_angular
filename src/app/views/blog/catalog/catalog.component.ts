import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../assets/types/product.type";
import {ActiveParamsType} from "../../../../assets/types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {FilterType} from "../../../../assets/types/filter.type";
import {AppliedFilterType} from "../../../../assets/types/applied-filter.type";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: ProductType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  pages: number[] = [];
  filterOpen: boolean = false;
  categories: FilterType[] = [];
  appliedFilters: AppliedFilterType[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productService.getCategories()
      .subscribe((dataCategory: FilterType[]) => {
        this.categories = dataCategory;

        this.activatedRoute.queryParams
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);
            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              for (let i = 0; i < this.categories.length; i++) {
                const foundType = this.categories[i];
                if (foundType.url === url) {
                  this.appliedFilters.push({
                    name: foundType.name,
                    urlParam: foundType.url
                  });
                }
              }
            });

          })
      });

    this.productService.getProducts(this.activeParams)
      .subscribe(data => {
        this.pages = [];
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }

        this.products = data.items;
      });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);

    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
    this.filterOpen = false;
  }

  isCategoryActive(url: string): boolean {
    return this.appliedFilters.some(filter => filter.urlParam === url);
  }

  updateFilterParam(url: string) {
    const isActive = this.isCategoryActive(url);
    if (isActive) {
      this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
    } else {
      this.activeParams.categories = [...this.activeParams.categories, url];
    }

    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
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

  toggleFiltering() {
    this.filterOpen = !this.filterOpen;
  }


}
