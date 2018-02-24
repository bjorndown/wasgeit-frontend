import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {News} from "./model/news";

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) {
  }

  public get(): Observable<News> {
    return this.http.get<News>('/rest/news')
  }

}
