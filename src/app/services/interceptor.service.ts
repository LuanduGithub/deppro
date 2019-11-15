import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  loading:any;
  constructor(
    public loadingController: LoadingController
  ) {}

  intercept(req: HttpRequest<any>, next:HttpHandler ): Observable<HttpEvent<any>>{
    let message;
    //let nombreApi = req.url.search('Login');

    let nombreApi = req.url.split('/')
    req.method === 'POST' && nombreApi[4] === 'Login'? message = 'Accediendo' : message = 'Enviando';
    req.method === 'GET'? message = `Cargando ${nombreApi[4]}` : null;
    this.presentLoading(message);
    return next.handle(req).pipe(
        finalize(() => this.dismissLoading())
    )
  }

  
  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize'
    });
    return await this.loading.present();
  }
  dismissLoading() {
    return this.loading.dismiss();
  }
}
