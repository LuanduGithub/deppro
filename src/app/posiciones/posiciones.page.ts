import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../services/categoria.service';
import { Comun, Posiciones } from '../models/modelsComunes';

import { PosicionesService } from './../services/posiciones.service';
import { EquipoService } from '../services/equipo.service';
import { FormControl, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.page.html',
  styleUrls: ['./posiciones.page.scss'],
})
export class PosicionesPage implements OnInit {
  categorias: any;
  categoriasList: Array<Comun>;
  positionList: Array<Posiciones>;
  categoriaSelected: number;
  categoriaSelectedView: boolean;
  equiposList: Array<Comun>;
  equipo = new FormControl('', [ Validators.required ]);
  showAddTeam = false;
  userAdmin: any;

  constructor(
    private categoriaService: CategoriaService,
    private posicionesService: PosicionesService,
    private equipoService: EquipoService,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getCategoriasList();
    this.loadUser();
  }
  ionViewWillLeave() {
    this.categorias.unsubscribe();
  }


  loadUser() {
    this.storage.get('setting:user').then(user => {
      this.userAdmin = user.admin;
    });
  }

  getCategoriasList() {
    this.categorias = this.categoriaService.getCategorias().subscribe(categoriasList => {
      this.categoriasList = categoriasList.msg;
    });
  }

  filtradoPorCategoria(e) {
    this.categoriaSelected = parseInt(e.detail.value, 10);
    this.categoriaSelectedView = true;
    this.getPositionList(this.categoriaSelected);
  }
  getPositionList(categoria) {
    this.posicionesService.getPosicionesList(categoria).subscribe(tp => {
      this.positionList = tp.msg;
    });
  }
  updateTable(obj) {
    this.posicionesService.postPosiciones(obj).subscribe(p => {
      this.showAddTeam = false;
      this.getPositionList(this.categoriaSelected);
    });
  }

  getEquiposList() {
    this.equipoService.getEquipos().subscribe(equipoList => {
      this.equiposList = equipoList.msg;
    });
  }
  showTeamToList() {
    this.showAddTeam = true;
    this.getEquiposList();
  }
  addTeamToList() {
    const obj = {
      Pos_Id: 0,
      Cate_Id: this.categoriaSelected,
      Equ_Id: this.equipo.value,
      Pos_Ptos: 0,
      Pos_Gan: 0,
      Pos_Per: 0,
      Pos_Jug: 0
    };
    this.updateTable(obj);
  }
  add2(position) {
    const obj = {
      Pos_Id: position.id,
      Cate_Id: this.categoriaSelected,
      Equ_Id: position.equipoId,
      Pos_Ptos: position.puntos + 2,
      Pos_Gan: position.ganados + 1,
      Pos_Per: position.perdidos,
      Pos_Jug: position.jugados + 1
    };
    this.updateTable(obj);
  }
  add1(position) {
    const obj = {
      Pos_Id: position.id,
      Cate_Id: this.categoriaSelected,
      Equ_Id: position.equipoId,
      Pos_Ptos: position.puntos + 1,
      Pos_Gan: position.ganados,
      Pos_Per: position.perdidos + 1,
      Pos_Jug: position.jugados + 1
    };
    this.updateTable(obj);
  }


}
