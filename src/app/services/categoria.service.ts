import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Comun, ComunList, CategoriaPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoria(id:number): Observable<Comun>{
    let url = environment.DBBaseURl +  `categorias/get/${id}`;
    return this.http.get<Comun>(url);
  }
  getCategorias(): Observable<ComunList>{
    let url = environment.DBBaseURl +  `categorias/getList`;
    return this.http.get<ComunList>(url);
  }
  postCategoria(id: number, nombre: string): Observable<CategoriaPost>{
    let url = environment.DBBaseURl +  `categorias/InsertOrUpdate`;
    let obj = {
      Cate_Id : id,
      Cate_Nomb : nombre
    }
    return this.http.post<CategoriaPost>(url, obj);
  }
}
