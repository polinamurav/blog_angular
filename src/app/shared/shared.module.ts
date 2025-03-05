import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { ProductCardComponent } from './components/product-card/product-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    LoaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [
    ProductCardComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
