import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../assets/types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RequestType} from "../../../assets/types/request.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  addRequest(params: RequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', params);
  }
}
