import { Component, ViewChild } from '@angular/core';
import { NovedadesService } from '../services/novedades.service';
import { Novedades } from '../models/modelsComunes';
import { Storage } from '@ionic/storage';
import { NewDataService } from '../services/new-data.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalTab2Page } from './modal/modal/modal.page';
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

  constructor(
    private noveService: NovedadesService,
    private storage: Storage,
    private newDataService: NewDataService,
    private route: Router,
    public modalController: ModalController,
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
      this.novedadesList = dataArray;
      console.log(this.novedadesList);
    });
  }

  editNovedad(novedad) {
    this.newDataService.setNovedad(novedad);
    this.route.navigate(['tabs/tab3']);
  }

  deleteNovedad(data) {
    this.modal(data);
  }

  async modal(data) {
    const modal = await this.modalController.create({
      component: ModalTab2Page,
      componentProps: { data },

    });
    await modal.present();
    await modal.onDidDismiss().then(dataTime => {

    });
  }
}
