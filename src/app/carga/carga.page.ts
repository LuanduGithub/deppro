import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CanchasService } from './../services/canchas.service';
import { CategoriaService } from './../services/categoria.service';
import { EquipoService } from './../services/equipo.service';
import { UsuariosService } from '../services/usuarios.service';

import { Comun, Usuario } from './../models/modelsComunes';
import { DesignacionesService } from '../services/designaciones.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


import { NewDataService } from './../services/new-data.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements OnInit {
  user: any;
  canchasList: Array<Comun>;
  categoriasList: Array<Comun>;
  equiposList: Array<Comun>;
  usuariosArbitrosList: Array<Usuario>;
  usuariosMesaList: Array<Usuario>;
  result: any;
  token: string;
  cleanButton = false;

  designationForm = new FormGroup({
    cancha: new FormControl('', [Validators.required]),
    dia: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    equipoA: new FormControl('', [Validators.required]),
    equipoB: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    arbitro1: new FormControl('', [Validators.required]),
    arbitro2: new FormControl('', [Validators.required]),
    arbitro3: new FormControl(''),
    anotador: new FormControl('', [Validators.required]),
    cronometro: new FormControl('', [Validators.required]),
    cronometro2: new FormControl('')
  });
  loading: any;
  dataXLS: any;
  elegirArchivo = 'Elegir Archivo';
  archivoElegido: string;
  programacion: any;
  type: string;
  arbitro1Edit: string;
  arbitro2Edit: string;
  anotadorEdit: string;
  cronometroEdit: string;
  constructor(
    private storage: Storage,
    /*     private canchaService: CanchasService,
        private categoriaService: CategoriaService,
        private equipoService: EquipoService, */
    private usuService: UsuariosService,
    private designacionService: DesignacionesService,
    private newDataService: NewDataService,
    private loadingController: LoadingController,
    private route: Router,

  ) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.editProgramacion();
    this.getUsuariosList();
    this.loadUser();
    this.storage.get('setting:tokenFirebase').then(token => { this.token = token; });
  }

  // load user
  loadUser() {
    this.storage.get('setting:user').then((user) => {
      this.user = user;
    });
  }

  editProgramacion() {
    this.programacion = this.newDataService.getProgramacion();
    if (this.programacion.prog === undefined) {
      this.route.navigate(['tabs/tab1']);
      return;
    } else {
      this.type = this.programacion.type;
      this.designationForm.controls.cancha.setValue(this.programacion.prog.cancha);
      this.designationForm.controls.dia.setValue(this.programacion.prog.fecha);
      this.designationForm.controls.hora.setValue(this.programacion.prog.hora);
      this.designationForm.controls.equipoA.setValue(this.programacion.prog.equipoA);
      this.designationForm.controls.equipoB.setValue(this.programacion.prog.equipoB);
      this.designationForm.controls.categoria.setValue(this.programacion.prog.categoria);
      this.usuService.getUsuarios().subscribe(usuariosList => {
        usuariosList.msg.filter(u => {
          if (u.nombre === this.programacion.prog.arbitro1) {
            this.designationForm.controls.arbitro1.setValue(u.id);
            this.arbitro1Edit = u.id.toString();
          }
          if (u.nombre === this.programacion.prog.arbitro2) {
            this.designationForm.controls.arbitro2.setValue(u.id);
            this.arbitro2Edit = u.id.toString();
          }
          if (u.nombre === this.programacion.prog.anotador) {
            this.designationForm.controls.anotador.setValue(u.id);
            this.anotadorEdit = u.id.toString();
          }
          if (u.nombre === this.programacion.prog.cronometro) {
            this.designationForm.controls.cronometro.setValue(u.id);
            this.cronometroEdit = u.id.toString();
          }

        });
      });
      console.log(this.programacion);
    }
  }


  /*   getCanchasList() {
      this.canchaService.getCanchas().subscribe(canchasList => {
        this.canchasList = canchasList.msg;
        this.getCategoriasList();
      });
    }
    getCategoriasList() {
      this.categoriaService.getCategorias().subscribe(categoriasList => {
        this.categoriasList = categoriasList.msg;
        this.getEquiposList();
      });
    }
    getEquiposList() {
      this.equipoService.getEquipos().subscribe(equipoList => {
        this.equiposList = equipoList.msg;
        this.getUsuariosList();
      });
    }
   */
  getUsuariosList() {
    this.usuService.getUsuarios().subscribe(usuariosList => {

      this.usuariosArbitrosList = usuariosList.msg.filter(a => {
        const arbitros = a.tipo === 'arbitro';
        return arbitros;
      });

      this.usuariosMesaList = usuariosList.msg.filter(a => {
        const mesa = a.tipo === 'mesa';
        return mesa;
      });
    });
  }
  formatDate(form) {
    const hora = new Date(form.value.hora);
    const dia = new Date(form.value.dia);
    const minutos = hora.getMinutes() === 0 ? '00' : hora.getMinutes();
    return `${(dia.getMonth() + 1)}/${dia.getDate()}/${dia.getFullYear()} ${hora.getHours()}:${minutos}`;
  }

  designar(form) {

    this.presentLoading('Enviando Designación');
    let obj;
    if (this.type === 'agregar') {
      obj = {
        Des_Id: this.programacion.prog.id,
        cancha: this.programacion.prog.cancha,
        equipoA: this.programacion.prog.equipoA,
        equipoB: this.programacion.prog.equipoB,
        Des_FechaHora: this.formatDateXLS(this.programacion.prog.fecha) + ' ' + this.programacion.prog.hora,
        categoria: this.programacion.prog.categoria,
        Usu_Arb1_Id: parseInt(form.value.arbitro1, 10),
        Usu_Arb2_Id: parseInt(form.value.arbitro2, 10),
        /* Usu_Arb3_Id: parseInt(form.value.arbitro3, 10) || '', */
        Usu_Anot_Id: parseInt(form.value.anotador, 10),
        Usu_Crono_Id: parseInt(form.value.cronometro, 10),
        /*  Usu_Crono2_Id: parseInt(form.value.cronometro2, 10), */
        Des_Res_Cuarto: this.programacion.prog.cuarto,
        Des_Res_Equ_A: this.programacion.prog.resultadoA,
        Des_Res_Equ_B: this.programacion.prog.resultadoB,
      };
    }

    if (this.type === 'editar') {
      obj = {
        Des_Id: this.programacion.prog.id,
        cancha: form.value.cancha,
        equipoA: form.value.equipoA,
        equipoB: form.value.equipoB,
        Des_FechaHora: this.formatDateXLS(form.value.dia) + ' ' + form.value.hora,
        categoria: form.value.categoria,
        Usu_Arb1_Id: parseInt(form.value.arbitro1, 10),
        Usu_Arb2_Id: parseInt(form.value.arbitro2, 10),
        /* Usu_Arb3_Id: parseInt(form.value.arbitro3, 10) || '', */
        Usu_Anot_Id: parseInt(form.value.anotador, 10),
        Usu_Crono_Id: parseInt(form.value.cronometro, 10),
        /*  Usu_Crono2_Id: parseInt(form.value.cronometro2, 10), */
        Des_Res_Cuarto: this.programacion.prog.cuarto,
        Des_Res_Equ_A: this.programacion.prog.resultadoA,
        Des_Res_Equ_B: this.programacion.prog.resultadoB,
      };
    }
    this.designacionService.postDesignacionesUpdate(obj).subscribe(() => {
      this.dismissLoading();
      this.route.navigate(['tabs/tab1']);
    });
  }
  async presentLoading(message = '') {
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize',
      spinner: 'dots'
    });
    await this.loading.present();
  }
  async dismissLoading() {
    await this.loading.dismiss();
  }


  formatDateXLS(dateXLS) {
    const date = dateXLS.split('/');
    return `${date[1]}/${date[0]}/${date[2]}`;
  }
}
