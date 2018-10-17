import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Agenda } from './model/agenda'

@Injectable()
export class AgendaService {

  constructor(private http: HttpClient) {

  }

  public get(): Observable<Agenda> {
    return this.http.get<Agenda>('/rest/agenda')
  }

}
