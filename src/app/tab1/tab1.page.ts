import { Component } from '@angular/core';
import { DesignacionesService } from './../services/designaciones.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

import { Storage } from '@ionic/storage';
import { Designaciones, Comun } from './../models/modelsComunes';
import { CategoriaService } from './../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

import * as moment from 'moment';
import { PopoverComponent } from '../shared/components/popover/popover.component';
import { promise } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  designaciones: Array<Designaciones>;
  designacionesTodas: Array<Designaciones>;
  user: any;
  showJuecesIndex = -1;
  showOfMesaIndex = -1;
  aceptadoIndex = -1;
  aceptado = false;
  fechaHoy: Date = new Date();
  listDesignaciones: any[] = [];
  noTieneDesignaciones = false;
  noHayPartidos = false;
  noHayDesignacion = false;

  categoriasList: Array<Comun>;
  avisoEstado = true;
  categorias: any;

  equipoA = new FormControl();
  equipoB = new FormControl();
  hotHour: any;
  error: any;
  constructor(
    private storage: Storage,
    public modalController: ModalController,
    private designacionesService: DesignacionesService,
    private categoriaService: CategoriaService,
    private popoverController: PopoverController
  ) {

  }
  ionViewWillEnter() {
    this.categoriaService.testgetinfo().subscribe(emp => {
      this.error = emp;
    }, error => {
      this.error = error;
    });
    this.designaciones = [];
    this.categoriasList = [];
    this.getHotHour();
    this.loadUser();
    this.getCategoriasList();
  }



  mostrarDesignacionesSegunRol(event = null) {
    this.storage.get('user').then(user => {
      if (user.admin) {
        this.getDesignacionesList(event);
      } else if (user.usuarioId !== 'invitado') {
        this.getDesignacionesListPorUsuario(user.usuarioId, event);
      } else {
        this.getDesignacionesList(event);
      }
    });
  }

  getDesignacionesList(event) {
    this.designacionesService.getDesignaciones().subscribe(designaciones => {
      if (designaciones) {
        this.designaciones = this.filtradoPorFecha(designaciones.msg);
        this.designacionesTodas = this.designaciones;
      } else {
        this.noTieneDesignaciones = true;
        this.noHayPartidos = true;
      }
      if (event) {event.target.complete(); }
    });
  }

  getDesignacionesListPorUsuario(id, event = null) {
    this.designacionesService.getDesignacionesPorUsuario(id).subscribe(designaciones => {
      if (designaciones) {
        this.designaciones = this.filtradoPorFecha(designaciones.msg);
      } else {
        this.noTieneDesignaciones = true;
        this.noHayDesignacion = true;
        if (event) {event.target.complete(); }
      }
    });
  }
  filtradoPorCategoria(e) {
    if (e.detail.value === 'todas') {
      this.designaciones = this.designacionesTodas;
      return;
    }

    const arr = this.designacionesTodas;
    const filtradoPorCategoria = arr.filter(c => {
      return e.detail.value === c.categoria;
    });
    if (filtradoPorCategoria.length) {
      this.designaciones = filtradoPorCategoria;
      this.noTieneDesignaciones = false;
      this.noHayPartidos = false;
    } else {
      this.designaciones = [];
      this.noTieneDesignaciones = true;
      this.noHayPartidos = true;
    }
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

  getCategoriasList() {
    this.categoriaService.getCategorias().subscribe(categoriasList => {
      this.categoriasList = categoriasList.msg;
      this.mostrarDesignacionesSegunRol();
    });
  }

  loadUser() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  showJueces(i) {
    if (this.showJuecesIndex === i) {
      this.showJuecesIndex = -1;
    } else {
      this.showJuecesIndex = i;
    }
  }

  showOfMesa(i) {
    if (this.showOfMesaIndex === i) {
      this.showOfMesaIndex = -1;
    } else {
      this.showOfMesaIndex = i;
    }
  }


  /**
   *
   * @param d trae la info del partido.
   * @param index index del element en el loop ngFor.
   */
  aceptarPartido(d, i) {
    const obj = {
      designacionId: d.id,
      usuarioId: this.user.usuarioId
    };
    d.aceptado = true;
  }

  /**
   *
   * @param d datos del row de designacion
   */
  async aceptarPartidoModal(d) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { data: d, user: this.user },

    });
    await modal.present();
    await modal.onDidDismiss().then(dataTime => {
      this.mostrarDesignacionesSegunRol();
    });
  }


  toggleAviso() {
    this.avisoEstado = !this.avisoEstado;
  }

  updateScoreTime(designacion) {
    const obj = {
      Des_Id: designacion.id,
      Des_Res_Eq_A: this.equipoA.value || designacion.resultadoB,
      Des_Res_Cuarto: designacion.cuarto,
      Des_Res_Eq_B: this.equipoB.value || designacion.resultadoB,
    };
    this.designacionesService.postDesignacionesScore(obj).subscribe(scoreA => {
      this.mostrarDesignacionesSegunRol();
    });
  }
  async presentPopover(ev: any, designacion) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    await popover.onDidDismiss().then(dataTime => {
      const obj = {
        Des_Id: designacion.id,
        Des_Res_Eq_A: designacion.resultadoA,
        Des_Res_Eq_B: designacion.resultadoB,
        Des_Res_Cuarto: dataTime.data.time
      };
      this.designacionesService.postDesignacionesScore(obj).subscribe(scoreA => {
        this.mostrarDesignacionesSegunRol();
      });
    });
  }

  getHotHour() {
    const date = new Date();
    this.hotHour = date.getHours();
    this.hotHour = this.hotHour.toString();
  }

  doRefresh(event) {
    this.mostrarDesignacionesSegunRol(event);

  }

}
