import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Posiciones, ComunList, ComunListPosiciones } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PosicionesService {

  constructor(
    private http: HttpClient
  ) { }

  getPosiciones(id: number): Observable<Posiciones> {
    const url = environment.DBBaseURl +  `posiciones/get/${id}`;
    return this.http.get<Posiciones>(url);
  }
  getPosicionesList(id): Observable<ComunListPosiciones> {
    const url = environment.DBBaseURl +  `posiciones/getList/${id}`;
    return this.http.get<ComunListPosiciones>(url);
  }
  postPosiciones(obj): Observable<Posiciones> {
    const url = environment.DBBaseURl +  `posiciones/InsertOrUpdate`;
    return this.http.post<Posiciones>(url, obj);
  }
}
