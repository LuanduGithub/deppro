import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Designaciones, DesignacionesList, DesignacionesPost, DesignacionesConfirmar, DesignacionesScore } from '../models/modelsComunes';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignacionesService {

  constructor(
    private http: HttpClient
  ) { }
  getUsuario(id: number): Observable<Designaciones> {
    const url = environment.DBBaseURl +  `designaciones/get/${id}`;
    return this.http.get<Designaciones>(url);
  }
  getDesignaciones(): Observable<DesignacionesList> {
    const url = environment.DBBaseURl +  `designaciones/getList`;
    return this.http.get<DesignacionesList>(url);
  }
  getDesignacionesPorUsuario(id: number): Observable<DesignacionesList> {
    const url = environment.DBBaseURl +  `designaciones/getListByUsuario/${id}`;
    return this.http.get<DesignacionesList>(url);
  }
  postDesignacionesInsert(obj: any): Observable<DesignacionesPost> {
    const url = environment.DBBaseURl +  `designaciones/Insert`;
    return this.http.post<DesignacionesPost>(url, obj);
  }
  postDesignacionesUpdate(obj: any): Observable<DesignacionesPost> {
    const url = environment.DBBaseURl +  `designaciones/Update`;
    return this.http.post<DesignacionesPost>(url, obj);
  }
  postDesignacionesScore(obj: any): Observable<DesignacionesScore> {
    const url = environment.DBBaseURl +  `designaciones/UpdateResultado`;
    return this.http.post<DesignacionesScore>(url, obj);
  }
  postDesignacionesConfirmar(obj: any): Observable<DesignacionesConfirmar> {
    const url = environment.DBBaseURl +  `designaciones/Confirmar`;
    return this.http.post<DesignacionesConfirmar>(url, obj);
  }

  deleteDesignaciones(obj: any): Observable<DesignacionesPost> {
    const url = environment.DBBaseURl +  `designaciones/Delete`;
    return this.http.post<DesignacionesPost>(url, obj);
  }
}
