import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  serverStaticPath = environment.serverStaticPath;

  constructor() { }

  ngOnInit(): void {
  }

}
