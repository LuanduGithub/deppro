import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Comun, ComunList, EquipoPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(
    private http: HttpClient
  ) { }

  getEquipo(id:number): Observable<Comun>{
    let url = environment.DBBaseURl +  `equipos/get/${id}`;
    return this.http.get<Comun>(url);
  }
  getEquipos(): Observable<ComunList>{
    let url = environment.DBBaseURl +  `equipos/getList`;
    return this.http.get<ComunList>(url);
  }
  postEquipo(id: number, nombre: string): Observable<EquipoPost>{
    let url = environment.DBBaseURl +  `equipos/InsertOrUpdate`;
    let obj = {
      Equ_Id : id,
      Equ_Nombre : nombre
    }
    console.log(obj)
    return this.http.post<EquipoPost>(url, obj);
  }
}
