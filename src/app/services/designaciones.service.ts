import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Designaciones, DesignacionesList, DesignacionesPost, DesignacionesConfirmar } from '../models/modelsComunes';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignacionesService {

  constructor(
    private http: HttpClient
  ) { }
  getUsuario(id:number): Observable<Designaciones>{
    let url = environment.DBBaseURl +  `designaciones/get/${id}`;
    return this.http.get<Designaciones>(url);
  }
  getDesignaciones(): Observable<DesignacionesList>{
    let url = environment.DBBaseURl +  `designaciones/getList`;
    return this.http.get<DesignacionesList>(url);
  }
  getDesignacionesPorUsuario(id:number): Observable<DesignacionesList>{
    let url = environment.DBBaseURl +  `designaciones/getListByUsuario/${id}`;
    return this.http.get<DesignacionesList>(url);
  }
  postDesignaciones(obj:any): Observable<DesignacionesPost>{
    let url = environment.DBBaseURl +  `designaciones/InsertOrUpdate`;
    return this.http.post<DesignacionesPost>(url, obj);
  }
  postDesignacionesConfirmar(obj:any): Observable<DesignacionesConfirmar>{
    let url = environment.DBBaseURl +  `designaciones/confirmar`;
    return this.http.post<DesignacionesConfirmar>(url, obj);
  }
}
