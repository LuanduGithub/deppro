import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Comun, CanchaPost, ComunList } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  constructor(
    private http: HttpClient
  ) { }

  getCancha(id:number): Observable<Comun>{
    let url = environment.DBBaseURl +  `canchas/get/${id}`;
    return this.http.get<Comun>(url);
  }
  getCanchas(): Observable<ComunList>{
    let url = environment.DBBaseURl +  `canchas/getList`;
    return this.http.get<ComunList>(url);
  }
  postCancha(id: number, nombre: string): Observable<CanchaPost>{
    let url = environment.DBBaseURl +  `canchas/InsertOrUpdate`;
    let obj = {
      Can_Id : id,
      Can_Nom : nombre
    }
    return this.http.post<CanchaPost>(url, obj);
  }


}
