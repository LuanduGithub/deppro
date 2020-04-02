import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DesignacionesService } from '../services/designaciones.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NewDataService } from '../services/new-data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any;
  views: any;
  loading: any;
  dataXLS: any;
  archivoElegido: string;
  constructor(
    private storage: Storage,
    private designacionService: DesignacionesService,
    private loadingController: LoadingController,
    private route: Router,
    private newDataService: NewDataService,
  ) { }

  ionViewWillEnter() {
    this.viewsEstadoFalse();
    this.loadUser();
    const editNovedades = this.newDataService.getNovedad();
    if (editNovedades) {
      this.editarNovedades();
    }
  }

  loadUser() {
    this.storage.get(`setting:user`).then((user) => {
      this.user = user;
    });
  }

  viewsEstadoFalse() {
    return this.views = {
      canchaView:
      {
        status: false,
        agregar: false,
        editar: false
      },
      equipoView: {
        status: false,
        agregar: false,
        editar: false
      },
      usuarioView: {
        status: false,
        agregar: false,
        editar: false
      },
      categoriaView: {
        status: false,
        agregar: false,
        editar: false
      },
      novedadView: {
        status: false,
        agregar: false,
        editar: false
      }
    };
  }

  /**
   * // fn : promesa --> funcion para retornar todos los valores a False
   */
  cargarView() {
    const promise = new Promise((resolve, reject) => {
      this.viewsEstadoFalse();
      resolve();
    });
    return promise;
  }

  /**
   * fn : funciones para cargar vistas de canchas
   */
  agregarCancha() {
    this.cargarView().then(() => {
      this.views.canchaView.status = true;
      this.views.canchaView.agregar = true;
    });
  }
  editarCancha() {
    this.cargarView().then(() => {
      this.views.canchaView.status = true;
      this.views.canchaView.editar = true;
    });
  }

  /**
   * fn: Funciones para cargar vistas de Equipos
   */
  agregarEquipo() {
    this.cargarView().then(() => {
      this.views.equipoView.status = true;
      this.views.equipoView.agregar = true;
    });
  }
  editarEquipo() {
    this.cargarView().then(() => {
      this.views.equipoView.status = true;
      this.views.equipoView.editar = true;
    });
  }

  /**
   * fn: Funciones para cargar vistas de Categorias
   */
  agregarCategoria() {
    this.cargarView().then(() => {
      this.views.categoriaView.status = true;
      this.views.categoriaView.agregar = true;
    });
  }
  editarCategoria() {
    this.cargarView().then(() => {
      this.views.categoriaView.status = true;
      this.views.categoriaView.editar = true;
    });
  }

  /**
   * fn: Funciones para cargar vistas de Usuario
   */
  agregarUsuario() {
    this.cargarView().then(() => {
      this.views.usuarioView.status = true;
      this.views.usuarioView.agregar = true;
    });
  }
  editarUsuario() {
    this.cargarView().then(() => {
      this.views.usuarioView.status = true;
      this.views.usuarioView.editar = true;
    });
  }

  /**
   * fn: Funciones para cargar vistas de Novedades
   */
  agregarNovedades() {
    this.cargarView().then(() => {
      this.views.novedadView.status = true;
      this.views.novedadView.agregar = true;
    });
  }
  editarNovedades() {
    this.cargarView().then(() => {
      this.views.novedadView.status = true;
      this.views.novedadView.editar = true;
    });
  }


  onFileChange(ev) {
    let workBook = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file.name);
    const namefile = file.name.split('.');
    this.archivoElegido = namefile[0] + '.xls';
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.dataXLS = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        /* this.archivoElegido = name + '.xls'; */
        initial = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
    };
    reader.readAsBinaryString(file);
  }

  formatDateXLS(dateXLS) {
    const date = dateXLS.split('/');
    return `${date[1]}/${date[0]}/${date[2]}`;
  }
  uploadProgramacion() {
    this.presentLoading('Enviando Designación');
    const arrProgramacion = [];

    this.dataXLS.forEach(element => {
      const programacion = {
        Des_Id: 0,
        Cancha: element.lugar,
        EquipoA: element.equipoA,
        EquipoB: element.equipoB,
        Des_FechaHora: this.formatDateXLS(element.dia) + ' ' + element.hora,
        Categoria: element.categoria,
        Des_Res_Cuarto: 'No Iniciado',
        Des_Res_Equ_A: 0,
        Des_Res_Equ_B: 0,
      };
      arrProgramacion.push(programacion);
    });

    this.designacionService.postDesignacionesInsert(arrProgramacion).subscribe(() => {
      this.dismissLoading();
      this.dataXLS = undefined;
      this.archivoElegido = '';
      this.route.navigate(['tabs/tab1']);
    }, error => { console.log(error); });
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
}
