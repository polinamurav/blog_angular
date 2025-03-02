import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailComponent } from './detail/detail.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CatalogComponent,
    DetailComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        BlogRoutingModule,
        ReactiveFormsModule
    ]
})
export class BlogModule { }
