import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioLoginPost } from '../models/modelsComunes';
import { NewDataService } from './../services/new-data.service';
import { DesignacionesService } from '../services/designaciones.service';
import { NovedadesService } from '../services/novedades.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userAdmin: any;
  progBadge: any;
  noveBadge: any;
  constructor(
    private storage: Storage,
    private newDataService: NewDataService,
    private designacionesService: DesignacionesService,
    private noveService: NovedadesService
  ) { }

  ionViewWillEnter() {
    this.loadUser();
  }
  ionViewDidEnter() {
    this.notNewDesignacion();
    this.notNewNovedades();
  }
  loadUser() {
    this.storage.get(`setting:user`).then(user => {
      this.userAdmin = user.admin;
    });
  }


  cleanBadgeD() {
    this.notNewDesignacion();
  }
  cleanBadgeN() {
    this.notNewNovedades();
  }
  cleanBoth() {
    this.cleanBadgeD();
    this.cleanBadgeN();
  }

  notNewDesignacion() {
    this.designacionesService.getDesignaciones().subscribe(d => {
      const service = this.filtradoPorFecha(d.msg);
      this.storage.get(`setting:designaciones`).then(l => {
        const storage = l;
        service.length === storage ? this.progBadge = 0 : this.progBadge = (service.length - storage);
      });
    });
  }

  filtradoPorFecha(arr) {
    return arr.filter(f => {
      const fechaDateHoy = new Date(); // establezco la fecha
      const lunes = fechaDateHoy.getDate() - fechaDateHoy.getDay(); // primer dia del mes menos primer dia de la semana
      const lunesDate = new Date(fechaDateHoy.setDate(lunes));
      const domingo = lunes + 6;
      const domingoDate = new Date(fechaDateHoy.setDate(domingo));
      const fecha = f.fecha.split('/');
      const dateFormatted = `${fecha[1]}/${fecha[0]}/${fecha[2]}`;
      const mydate = new Date(dateFormatted);
      return mydate > lunesDate && mydate < domingoDate;
    });
  }

  notNewNovedades() {
    this.noveService.getNovedades().subscribe(n => {
      const service = n.msg;
      this.storage.get(`setting:novedades`).then(l => {
        const storage = l;
        service.length === storage ? this.noveBadge = 0 : this.noveBadge = (service.length - storage);
      });
    });
  }
}
