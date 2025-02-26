import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProductType} from "../../../assets/types/product.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getPopularProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + 'articles/top');
  }
}
