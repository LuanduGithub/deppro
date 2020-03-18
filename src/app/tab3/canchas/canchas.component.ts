import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { CanchasService } from './../../services/canchas.service';
import { Comun, ComunList } from '../../models/modelsComunes';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.scss'],
})
export class CanchasComponent implements OnInit {

  canchasList: Array<Comun>;
  canchaSeleccionada: Comun[];
  agregarCanchaFormGroup: FormGroup;
  editarCanchaFormGroup: FormGroup;
  token: any;
  result: any;

  @Input() agregar: boolean;
  @Input() editar: boolean;
  canchas: any;
  loading: any;
  constructor(
    private canchasService: CanchasService,
    private loadingController: LoadingController
  ) {


  }
  ngOnInit() {
    this.getCanchas();
    this.agregarCanchaFormGroup = new FormGroup({
      canchaNombre: new FormControl('', [ Validators.required ]),
    });
    this.editarCanchaFormGroup = new FormGroup({
      editarCanchaNombre: new FormControl('', [ Validators.required ]),
      editarCanchaNombreNuevo: new FormControl({value : '', disabled: true}, Validators.required),
    });
 }


  getCanchas() {
    this.canchas = this.canchasService.getCanchas().subscribe(canchas => {
      const canchasList = canchas.msg;
      this.canchasList = canchasList.sort(this.getSortOrder('nombre'));
    });
  }

  ionViewWillLeave() {
    this.canchas.unsubscribe();
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


  onSubmitAgregar(formGroup) {
    this.presentLoading('Agregando Cancha');
    const id = 0;
    const nombre = this.agregarCanchaFormGroup.value.canchaNombre;
    this.canchasService.postCancha(id, nombre).subscribe(() => {
      this.getCanchas();
      this.setValueVacio();
      this.dismissLoading();
    });
  }

  onSubmitEditar(formGroup) {
    this.presentLoading('Editando Cancha');
    const id = this.canchaSeleccionada[0].id;
    const nombre = this.editarCanchaFormGroup.value.editarCanchaNombreNuevo;
    this.canchasService.postCancha(id, nombre).subscribe(() => {
      this.getCanchas();
      this.setValueVacio();
      this.canchaSeleccionada = undefined;
      this.dismissLoading();
    });
  }



  editCanchaNombreSelected(val) {
    if (val) {
      const valNumber = parseInt(val, 10);
      this.canchaSeleccionada = this.canchasList.filter(n => n.id === valNumber);
      const nombre = this.canchaSeleccionada[0].nombre;
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.setValue(nombre);
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.enable();
    }
  }


  setValueVacio() {
    if (this.agregar) {
      this.agregarCanchaFormGroup.controls.canchaNombre.setValue('');
      this.agregarCanchaFormGroup.controls.canchaNombre.setValue('');
    }
    if (this.editar) {
      this.editarCanchaFormGroup.controls.editarCanchaNombre.setValue('');
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.setValue('');
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.disable();
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
