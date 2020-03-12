import { Injectable } from '@angular/core';
import { DesignacionesService } from './designaciones.service';
import { NovedadesService } from './novedades.service';
import { Observable } from 'rxjs';
import { Designaciones } from '../models/modelsComunes';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NewDataService {
  designaciones: any;
  constructor(
    private designacionesService: DesignacionesService,
    private novedadesService: NovedadesService,
    private storage: Storage,
  ) { }

  storeDesignacionesStorage(lengthDesignaciones: number) {
    this.storage.set(`setting:designaciones`, lengthDesignaciones);
  }

  storeNovedadesStorage(lengthNovedades: number) {
    this.storage.set(`setting:novedades`, lengthNovedades);
  }

}
