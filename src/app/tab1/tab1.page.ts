import { Component } from '@angular/core';
import { DesignacionesService } from './../services/designaciones.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

import { Storage } from '@ionic/storage';
import { Designaciones, Comun } from './../models/modelsComunes';
import { CategoriaService } from './../services/categoria.service';


import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  designaciones:Array<Designaciones>;
  designacionesTodas:Array<Designaciones>
  user:any;
  showJuecesIndex:number = -1;
  showOfMesaIndex:number = -1;
  aceptadoIndex:number = -1;
  aceptado: boolean = false;
  fechaHoy:Date = new Date();
  listDesignaciones: any[]=[];
  noTieneDesignaciones: boolean = false;
  noHayPartidos: boolean= false;
  noHayDesignacion: boolean= false;

  categoriasList: Array<Comun>;
  constructor(
    private storage: Storage,
    public modalController: ModalController,
    private designacionesService: DesignacionesService,
    private categoriaService: CategoriaService,
  ) {

  }
  ionViewWillEnter(){
    this.loadUser();
    this.getCategoriasList();
  } 

  mostrarDesignacionesSegunRol(){
    this.storage.get('user').then(user => {
      if(user.admin){
        this.getDesignacionesList()
      }else if(user.usuarioId !== 'invitado'){
        this.getDesignacionesListPorUsuario(user.usuarioId)
      }else{
        this.getDesignacionesList()
      }
    });
  }

  getDesignacionesList(){
    this.designacionesService.getDesignaciones().subscribe(designaciones => {
      if(designaciones){
        this.designaciones =  this.filtradoPorFecha(designaciones.msg);
        this.designacionesTodas = this.designaciones
      }else{
        this.noTieneDesignaciones = true;
        this.noHayPartidos = true;
      }
    })
  }

  getDesignacionesListPorUsuario(id){
    this.designacionesService.getDesignacionesPorUsuario(id).subscribe(designaciones => {
      if(designaciones){
        this.designaciones =  this.filtradoPorFecha(designaciones.msg);
      }else{
        this.noTieneDesignaciones = true;
        this.noHayDesignacion = true;
      }
    })
  }
  filtradoPorCategoria(e){
    if(e.detail.value === 'todas' ){
      this.designaciones = this.designacionesTodas;
      return
    }
    let arr = this.designacionesTodas;
    let filtradoPorCategoria = arr.filter(c => {
      return e.detail.value === c.categoria;
    });
    if(filtradoPorCategoria.length){
      this.designaciones = filtradoPorCategoria;
      this.noTieneDesignaciones = false; 
      this.noHayPartidos = false;
    }else{
      this.designaciones = [];
      this.noTieneDesignaciones = true; 
      this.noHayPartidos = true;
    }
  }
  

  filtradoPorFecha(arr){
      return arr.filter(f => {
        let fechaDateHoy = new Date();// establezco la fecha
        let lunes = fechaDateHoy.getDate() - fechaDateHoy.getDay(); // primer dia del mes menos primer dia de la semana
        let lunesDate = new Date(fechaDateHoy.setDate(lunes));
        let domingo = lunes + 6;
        let domingoDate = new Date(fechaDateHoy.setDate(domingo));
        let fecha = f.fecha.split('/');
        let dateFormatted = `${fecha[1]}/${fecha[0]}/${fecha[2]}`
        let mydate = new Date(dateFormatted); 
        return mydate > lunesDate && mydate < domingoDate;
      });
  }

  getCategoriasList(){
    this.categoriaService.getCategorias().subscribe( categoriasList => {
      this.categoriasList = categoriasList.msg;
      this.mostrarDesignacionesSegunRol();
    })
  }

  loadUser(){
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  showJueces(i){
    if (this.showJuecesIndex === i) {
      this.showJuecesIndex = -1;
    } else {
      this.showJuecesIndex = i;
    }
  }

  showOfMesa(i){
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
  aceptarPartido(d, i){
    let obj = {
      designacionId: d.id,
      usuarioId: this.user.usuarioId
    }
    d.aceptado = true;
  }

  /**
   * 
   * @param d datos del row de designacion
   */
  async aceptarPartidoModal(d) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{ data: d, user: this.user },
      
    });
    return await modal.present();


  }

}
