import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductType} from "../../../../assets/types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  serverStaticPath = environment.serverStaticPath;
  @Input() product!: ProductType;

  constructor() { }

  ngOnInit(): void {
  }

}
