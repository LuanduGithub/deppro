import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  loading: any;
  constructor(
    public loadingController: LoadingController
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let message;
    // let nombreApi = req.url.search('Login');

    const nombreApi = req.url.split('/');
    if (req.method === 'POST' && nombreApi[5] === 'Login') {
      message = 'Accediendo';
      this.presentLoading(message);
    } else {
      message = 'Enviando';
    }
    // req.method === 'GET' ? message = `Cargando ${nombreApi[4]}` : message = '';

    return next.handle(req).pipe(
      finalize(() => {
        if (req.method === 'POST' && nombreApi[5] === 'Login') {
          this.dismissLoading();
        }
      })
    );
  }

  async presentLoading(message = '') {
    this.loading.dismiss();
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize'
    });
    await this.loading.present();
  }
  async dismissLoading() {
    await this.loading.dismiss();
  }
}
