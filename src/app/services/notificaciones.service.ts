import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlBase } from './../constants/url';
import { Observable } from 'rxjs';
import { Comun, ComunList, CategoriaPost } from '../models/modelsComunes';
import { environment } from './../../environments/environment';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  user: any;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.storage.get(`setting:user`).then((user) => {
    });
  }
  sendNotificaciones(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const key = 'key=' + this.user.token;
    const url = 'https://fcm.googleapis.com/fcm/send';
    return this.http.post<any>(
      url,
      {
        headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: key
        })
      }
      );
  }
}
