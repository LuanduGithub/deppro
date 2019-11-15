import { Component } from '@angular/core';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user:any;
  views:any;
  constructor(
    private storage: Storage
  ) {  }

  ionViewWillEnter(){
    this.viewsEstadoFalse();
    this.loadUser();
  }

  loadUser(){
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  viewsEstadoFalse(){
    return this.views = {
      canchaView:
      {
        status: false,
        agregar : false,
        editar : false
      },
      equipoView : {
        status: false,
        agregar : false,
        editar : false
      },
      usuarioView : {
        status: false,
        agregar : false,
        editar : false
      },
      categoriaView : {
        status: false,
        agregar : false,
        editar : false
      },
      novedadView : {
        status: false,
        agregar : false,
        editar : false
      }
    };
  }

  /**
   * // fn : promesa --> funcion para retornar todos los valores a False
   */
  cargarView(){
    let promise = new Promise((resolve, reject) => {
      this.viewsEstadoFalse();
      resolve();
    });
    return promise
  }
  
/** 
 * fn : funciones para cargar vistas de canchas
*/
  agregarCancha(){
    this.cargarView().then(() => {
        this.views.canchaView.status = true;
        this.views.canchaView.agregar = true;
    })
  }
  editarCancha(){
    this.cargarView().then(() => {
      this.views.canchaView.status = true;
      this.views.canchaView.editar = true;
    })
  }

/**
 * fn: Funciones para cargar vistas de Equipos
 */
  agregarEquipo(){
    this.cargarView().then(() => {
      this.views.equipoView.status = true;
      this.views.equipoView.agregar = true;
    })
  }
  editarEquipo(){
    this.cargarView().then(() => {
      this.views.equipoView.status = true;
      this.views.equipoView.editar = true;
    })
  }

  /**
 * fn: Funciones para cargar vistas de Categorias
 */
agregarCategoria(){
  this.cargarView().then(() => {
    this.views.categoriaView.status = true;
    this.views.categoriaView.agregar = true;
  })
}
editarCategoria(){
  this.cargarView().then(() => {
    this.views.categoriaView.status = true;
    this.views.categoriaView.editar = true;
  })
}

  /**
 * fn: Funciones para cargar vistas de Usuario
 */
agregarUsuario(){
  this.cargarView().then(() => {
    this.views.usuarioView.status = true;
    this.views.usuarioView.agregar = true;
  })
}
editarUsuario(){
  this.cargarView().then(() => {
    this.views.usuarioView.status = true;
    this.views.usuarioView.editar = true;
  })
}

  /**
 * fn: Funciones para cargar vistas de Novedades
 */
agregarNovedades(){
  this.cargarView().then(() => {
    this.views.novedadView.status = true;
    this.views.novedadView.agregar = true;
  })
}
editarNovedades(){
  this.cargarView().then(() => {
    this.views.novedadView.status = true;
    this.views.novedadView.editar = true;
  })
}
}
