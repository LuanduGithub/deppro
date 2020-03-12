import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NovedadesService } from '../services/novedades.service';
import { Novedades } from '../models/modelsComunes';
import { Storage } from '@ionic/storage';
import { NewDataService } from '../services/new-data.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  novedadesList: Array<Novedades>;
  novedadesListTotal: number;
  data: Array<Novedades>;
  user: any;
  cantNovedades = 4;
  cantNovedadesInicial = 0;
  cantNovedadesFinal: number = this.cantNovedades;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  constructor(
    private noveService: NovedadesService,
    private storage: Storage,
    private newDataService: NewDataService
  ) { }
  ionViewWillEnter() {
    this.novedadesList = [];
    this.getNovedades();
    this.loadUser();
  }

  ionViewDidLeave() {
    this.newDataService.storeNovedadesStorage(this.novedadesListTotal);
  }

  loadUser() {
    this.storage.get(`setting:user`).then((user) => {
      this.user = user;
    });
  }
  getNovedades() {
    this.noveService.getNovedades().subscribe(novedades => {
      this.novedadesListTotal = novedades.msg.length;
      const dataArray = novedades.msg;
      dataArray.reverse();
      this.data = dataArray;
      this.novedadesList = dataArray.slice(this.cantNovedadesInicial, this.cantNovedadesFinal).map(n => {
        return n;
      });
      console.log(this.novedadesList );
    });
  }

  loadData(event) {
    let dateArray = this.data;
    this.cantNovedadesInicial = this.cantNovedadesFinal;
    this.cantNovedadesFinal = this.cantNovedadesFinal + this.cantNovedades;

    console.log(this.cantNovedadesInicial + ' ' + this.cantNovedadesFinal);

    dateArray = dateArray.slice(this.cantNovedadesInicial, this.cantNovedadesFinal).map(n => {
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
