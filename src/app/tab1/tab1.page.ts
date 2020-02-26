import { Component } from '@angular/core';
import { DesignacionesService } from './../services/designaciones.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

import { Storage } from '@ionic/storage';
import { Designaciones, Comun } from './../models/modelsComunes';
import { CategoriaService } from './../services/categoria.service';

import { HeaderComponent } from './../shared/components/header/header.component';


import * as moment from 'moment';

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
  showBtnPosiciones = false;
  avisoEstado = true;
  constructor(
    private storage: Storage,
    public modalController: ModalController,
    private designacionesService: DesignacionesService,
    private categoriaService: CategoriaService,
  ) {

  }
  ionViewWillEnter() {
    this.loadUser();
    this.getCategoriasList();
  }

  mostrarDesignacionesSegunRol() {
    this.storage.get('user').then(user => {
      if (user.admin) {
        this.getDesignacionesList();
      } else if (user.usuarioId !== 'invitado') {
        this.getDesignacionesListPorUsuario(user.usuarioId);
      } else {
        this.getDesignacionesList();
      }
    });
  }

  getDesignacionesList() {
    this.designacionesService.getDesignaciones().subscribe(designaciones => {
      if (designaciones) {
        this.designaciones =  this.filtradoPorFecha(designaciones.msg);
        this.designacionesTodas = this.designaciones;
      } else {
        this.noTieneDesignaciones = true;
        this.noHayPartidos = true;
      }
    });
  }

  getDesignacionesListPorUsuario(id) {
    this.designacionesService.getDesignacionesPorUsuario(id).subscribe(designaciones => {
      if (designaciones) {
        this.designaciones =  this.filtradoPorFecha(designaciones.msg);
      } else {
        this.noTieneDesignaciones = true;
        this.noHayDesignacion = true;
      }
    });
  }
  filtradoPorCategoria(e) {
    console.log(e.detail.value);
    if (e.detail.value === 'todas' ) {
      this.designaciones = this.designacionesTodas;
      this.showBtnPosiciones = false;
      return;
    } else {
      this.showBtnPosiciones = true;
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
    this.categoriaService.getCategorias().subscribe( categoriasList => {
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
    return await modal.present();
  }

  toggleAviso() {
    this.avisoEstado = !this.avisoEstado;
  }

}
