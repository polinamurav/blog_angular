import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductType} from "../../../../assets/types/product.type";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product!: ProductType;
  recommendedProducts: ProductType[] = [];
  serverStaticPath = environment.serverStaticPath;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productService.getProduct(params['url'])
        .subscribe((data: ProductType) => {
          this.product = data;
        })
    });
  }

}
