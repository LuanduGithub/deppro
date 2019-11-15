import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Comun, ComunList, CategoriaPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private http: HttpClient
  ) { }
  sendNotificaciones(obj): Observable<any>{
    let key = 'key=AAAAO1V0ZHA:APA91bGChdzg344aCjNApM4c49FZEyAPkN_J26VnqnMxQezwWxmcYCw9Jm_JJzx1LXZR1sEEbII0_Xiv65YCc6KyVg94PvFU31ht8raQpZoGEKFo6VSNPLQa5dydx6CKMbKTfLnwbaCZ'
    let url = 'https://fcm.googleapis.com/fcm/send';
    return this.http.post<any>(
      url, 
      obj,
      {
        headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': key
        })
      }
      );
  }
}
