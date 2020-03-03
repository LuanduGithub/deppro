import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';

import { CanchasService } from './../services/canchas.service';
import { CategoriaService } from './../services/categoria.service';
import { EquipoService } from './../services/equipo.service';
import { UsuariosService } from '../services/usuarios.service';

import { Comun, Usuario } from './../models/modelsComunes';
import { DesignacionesService } from '../services/designaciones.service';

import { FCM } from '@ionic-native/fcm/ngx';

import { NotificacionesService } from './../services/notificaciones.service';

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


  designationForm = new FormGroup({
    cancha: new FormControl('', [ Validators.required ]),
    dia: new FormControl('', [ Validators.required ]),
    hora: new FormControl('', [ Validators.required ]),
    equipoA: new FormControl('', [ Validators.required ]),
    equipoB: new FormControl('', [ Validators.required ]),
    categoria: new FormControl('', [ Validators.required ]),
    arbitro1: new FormControl('', [ Validators.required ]),
    arbitro2: new FormControl('', [ Validators.required ]),
    arbitro3: new FormControl(''),
    anotador: new FormControl('', [ Validators.required ]),
    cronometro: new FormControl('', [ Validators.required ]),
    cronometro2: new FormControl('')
  });
  constructor(
    private fcm: FCM,
    private storage: Storage,
    private canchaService: CanchasService,
    private categoriaService: CategoriaService,
    private equipoService: EquipoService,
    private usuService: UsuariosService,
    private designacionService: DesignacionesService,
    private notService: NotificacionesService
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.init();
    this.storage.get('tokenFirebase').then( token => { this.token = token; });
  }
  loadUser() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  init() {
    this.getCanchasList();
    this.loadUser();
  }
  getCanchasList() {
    this.canchaService.getCanchas().subscribe( canchasList => {
      this.canchasList = canchasList.msg;
      this.getCategoriasList();
    });
  }
  getCategoriasList() {
    this.categoriaService.getCategorias().subscribe( categoriasList => {
      this.categoriasList = categoriasList.msg;
      this.getEquiposList();
    });
  }
  getEquiposList() {
    this.equipoService.getEquipos().subscribe( equipoList => {
      this.equiposList = equipoList.msg;
      this.getUsuariosList();
    });
  }

  getUsuariosList() {
    this.usuService.getUsuarios().subscribe( usuariosList => {

      this.usuariosArbitrosList = usuariosList.msg.filter(a => {
        const arbitros =  a.tipo === 'arbitro';
        return arbitros;
      });

      this.usuariosMesaList = usuariosList.msg.filter(a => {
        const mesa =  a.tipo === 'mesa';
        return mesa;
      });
    });
  }
  formatDate(form) {
    const hora = new Date(form.value.hora);
    const dia =  new Date(form.value.dia);
    const minutos = hora.getMinutes() === 0 ? '00' : hora.getMinutes();
    return `${(dia.getMonth() + 1)}/${dia.getDate()}/${dia.getFullYear()} ${hora.getHours()}:${minutos}` ;
  }

  designar(form) {
    const obj = {
      Des_Id: 0,
      Can_Id: parseInt(form.value.cancha, 10),
      Equ_A_Id: parseInt(form.value.equipoA, 10),
      Equ_B_Id: parseInt(form.value.equipoB, 10),
      Des_FechaHora: this.formatDate(form),
      Cate_Id: parseInt(form.value.categoria, 10),
      Usu_Arb1_Id: parseInt(form.value.arbitro1, 10),
      Usu_Arb2_Id: parseInt(form.value.arbitro2, 10),
      /* Usu_Arb3_Id: parseInt(form.value.arbitro3, 10) || '', */
      Usu_Anot_Id: parseInt(form.value.anotador, 10),
      Usu_Crono_Id: parseInt(form.value.cronometro, 10),
     /*  Usu_Crono2_Id: parseInt(form.value.cronometro2, 10), */
      Des_Res_Cuarto: 'No Iniciado',
      Des_Res_Equ_A: 0,
      Des_Res_Equ_B: 0,
    };
    this.designacionService.postDesignaciones(obj).subscribe(() => {

    });
  }
}
