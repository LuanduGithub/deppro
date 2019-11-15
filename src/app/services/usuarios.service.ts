import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Usuario, UsuarioList, UsuarioPost, UsuarioLoginPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    public http: HttpClient
  ) { }
  getUsuario(id:number): Observable<Usuario>{
    let url = environment.DBBaseURl +  `usuarios/get/${id}`;
    return this.http.get<Usuario>(url);
  }
  getUsuarios(): Observable<UsuarioList>{
    let url = environment.DBBaseURl +  `usuarios/getList`;
    return this.http.get<UsuarioList>(url);
  }
  postUsuario(obj:any): Observable<UsuarioPost>{
    let url = environment.DBBaseURl +  `usuarios/InsertOrUpdate`;
    return this.http.post<UsuarioPost>(url, obj);
  }
  postUsuarioLogin(obj:any): Observable<UsuarioLoginPost>{

    let url = environment.DBBaseURl +  `usuarios/Login`;

    return this.http.post<UsuarioLoginPost>(
      url, 
      obj
      );
  }
}
