import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  // getComments(): Observable<FilterType[]> {
  //   return this.http.get<FilterType[]>(environment.api + 'comments');
  // }
}
