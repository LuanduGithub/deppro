import { Injectable } from '@angular/core';
import { DesignacionesService } from './designaciones.service';
import { NovedadesService } from './novedades.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NewDataService {
  designaciones: any;
  programacion: any;
  novedad: any;
  type: string;
  constructor(
    private storage: Storage,
  ) { }

  storeDesignacionesStorage(lengthDesignaciones: number) {
    this.storage.set(`setting:designaciones`, lengthDesignaciones);
  }

  storeNovedadesStorage(lengthNovedades: number) {
    this.storage.set(`setting:novedades`, lengthNovedades);
  }

  setProgramacion(programacion, type) {
    this.programacion = programacion;
    this.type = type;
  }

  getProgramacion() {
    const obj = {prog: this.programacion, type: this.type};
    return obj;
  }

  setNovedad(novedad) {
    this.novedad = novedad;
  }

  getNovedad() {
    return this.novedad;
  }

}
