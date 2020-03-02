import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Novedades, NovedadesList, NovedadesPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  constructor(
    private http: HttpClient
  ) { }

  getNovedad(id: number): Observable<Novedades> {
    const url = environment.DBBaseURl +  `novedades/get/${id}`;
    return this.http.get<Novedades>(url);
  }
  getNovedades(): Observable<NovedadesList> {
    const url = environment.DBBaseURl +  `novedades/getList`;
    return this.http.get<NovedadesList>(url);
  }
  postNovedades(obj): Observable<NovedadesPost> {
    const url = environment.DBBaseURl +  `novedades/InsertOrUpdate`;
    return this.http.post<NovedadesPost>(url, obj);
  }
}
