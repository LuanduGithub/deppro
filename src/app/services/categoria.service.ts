import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { CategoriaPost, Categoria, CategoriaList } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoria(id: number): Observable<CategoriaList> {
    const url = environment.DBBaseURl +  `categorias/get/${id}`;
    return this.http.get<CategoriaList>(url);
  }
  getCategorias(): Observable<CategoriaList> {
    const url = environment.DBBaseURl +  `categorias/getList`;
    return this.http.get<CategoriaList>(url);
  }
  postCategoria(id: number, nombre: string): Observable<CategoriaPost> {
    const url = environment.DBBaseURl +  `categorias/InsertOrUpdate`;
    const obj = {
      Cate_Id : id,
      Cate_Nomb : nombre
    };
    return this.http.post<CategoriaPost>(url, obj);
  }
  testgetinfo(): Observable<any> {
    const url = 'http://designaciones.elemsoft.net/api/canchas/getList';
    return this.http.get<any>(url);
  }
}
