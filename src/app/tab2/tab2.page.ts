import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NovedadesService } from '../services/novedades.service';
import { Novedades } from '../models/modelsComunes';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  novedadesList: Array<Novedades>;
  data: Array<Novedades>;
  user: any;
  cantNovedades = 4;
  cantNovedadesInicial = 0;
  cantNovedadesFinal: number = this.cantNovedades;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  constructor(
    private noveService: NovedadesService,
    private storage: Storage,
  ) {}
  ionViewWillEnter() {
    this.getNovedades();
    this.loadUser();
  }
  loadUser() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }
  getNovedades() {
    this.noveService.getNovedades().subscribe(novedades => {
      let dateArray = novedades.msg;
      dateArray = dateArray.sort(this.getSortOrder('fecha'));
      dateArray = dateArray.reverse();
      this.data = dateArray;
      this.novedadesList = dateArray.slice(this.cantNovedadesInicial, this.cantNovedadesFinal).map( n => {
          return n;
      });
    });
  }

  loadData(event) {
    let dateArray = this.data;
    this.cantNovedadesInicial = this.cantNovedadesFinal;
    this.cantNovedadesFinal = this.cantNovedadesFinal + this.cantNovedades;

    console.log(this.cantNovedadesInicial + ' ' + this.cantNovedadesFinal);

    dateArray = dateArray.slice(this.cantNovedadesInicial, this.cantNovedadesFinal).map( n => {
        return n;
    });

    this.novedadesList.push(...dateArray);

    setTimeout(() => {
      event.target.complete();
      if (this.novedadesList.length === this.data.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getSortOrder(prop) {
    return (a, b) => {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
  }
}
