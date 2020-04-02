import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Novedades } from './../../models/modelsComunes';
import { NovedadesService } from './../../services/novedades.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewDataService } from './../../services/new-data.service';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss'],
})
export class NovedadesComponent implements OnInit {
  novedadesList: Array<Novedades>;
  agregarNovedadFormGroup: FormGroup;
  editarNovedadFormGroup: FormGroup;

  @Input() agregar = false;
  @Input() editar = false;
  fecha: string;
  novedades: any;
  loading: HTMLIonLoadingElement;
  editNovedades: any;
  constructor(
    private noveService: NovedadesService,
    private loadingController: LoadingController,
    private route: Router,
    private newDataService: NewDataService,
  ) { }

  ngOnInit() {
    this.agregarNovedadFormGroup = new FormGroup({
      novedadTitulo: new FormControl('', [Validators.required]),
      novedadCuerpo: new FormControl('', [Validators.required]),
      novedadFecha: new FormControl(new Date()),
    });
    this.editNovedades = this.newDataService.getNovedad();
    if (this.editNovedades) {
      this.editar = true;
      this.editarNovedadFormGroup = new FormGroup({
        editarNovedadTitulo: new FormControl(this.editNovedades.titulo, [Validators.required]),
        editarNovedadCuerpo: new FormControl(this.editNovedades.cuerpo, [Validators.required]),
        editarNovedadFecha: new FormControl(new Date()),
      });
    }

  }

  onSubmitAgregar(formGroup) {
    this.presentLoading('Agregando Novedad');
    const obj = {
      Nove_Id: 0,
      Nove_Titulo: formGroup.value.novedadTitulo,
      Nove_Fecha: this.formatDate(this.agregarNovedadFormGroup.value.novedadFecha),
      Nove_Cuerpo: formGroup.value.novedadCuerpo,
    };
    this.noveService.postNovedades(obj).subscribe(() => {
      this.setValueVacio();
      this.dismissLoading();
    });
  }

  formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  onSubmitEditar(formGroup) {
    this.presentLoading('Editando Novedad');
    const obj = {
      Nove_Id: this.editNovedades.id,
      Nove_Titulo: formGroup.value.editarNovedadTitulo,
      Nove_Cuerpo: formGroup.value.editarNovedadCuerpo,
      Nove_Fecha: this.formatDate(this.editarNovedadFormGroup.value.editarNovedadFecha)
    };

    this.noveService.postNovedades(obj).subscribe(() => {
      this.setValueVacio();
      this.dismissLoading();
      this.editar =  false;
      this.route.navigate(['tabs/tab2']);
    });
  }

  /**
   * fn: ordenar alfabeticamente el arreglo
   * @param prop --> es el nombre por el cual queremos ordenar el arreglo
   */
  getSortOrder(prop) {
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  setValueVacio() {
    if (this.agregar) {
      this.agregarNovedadFormGroup.controls.novedadTitulo.setValue('');
      this.agregarNovedadFormGroup.controls.novedadCuerpo.setValue('');
    }
    if (this.editar) {
      this.editarNovedadFormGroup.controls.editarNovedadTitulo.setValue('');
      this.editarNovedadFormGroup.controls.editarNovedadCuerpo.setValue('');
    }

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
