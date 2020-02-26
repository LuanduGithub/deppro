import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Novedades } from './../../models/modelsComunes';
import { NovedadesService } from './../../services/novedades.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss'],
})
export class NovedadesComponent implements OnInit {
  novedadesList: Array<Novedades>;
  novedadSeleccionado: Novedades[];
  agregarNovedadFormGroup: FormGroup;
  editarNovedadFormGroup: FormGroup;

  @Input() agregar = false;
  @Input() editar = false;
  fecha: string;
  constructor(
    private noveService: NovedadesService
  ) { }

  ngOnInit() {

    this.getNovedades();
    this.agregarNovedadFormGroup = new FormGroup({
      novedadTitulo: new FormControl('', [Validators.required]),
      novedadCuerpo: new FormControl('', [Validators.required]),
      novedadFecha: new FormControl(new Date()),
    });
    this.editarNovedadFormGroup = new FormGroup({
      editarSeleccionarNovedadNombre: new FormControl('', [Validators.required]),
      editarNovedadTitulo: new FormControl('', [Validators.required]),
      editarNovedadCuerpo: new FormControl('', [Validators.required]),
      editarNovedadFecha: new FormControl(new Date()),
    });
    this.fecha = this.formatDate();
  }

  getNovedades() {
    this.noveService.getNovedades().subscribe(novedades => {
      const novedadesList = novedades.msg;
      this.novedadesList = novedadesList.sort(this.getSortOrder('nombre'));
    });
  }
  onSubmitAgregar(formGroup) {
    const id = 0;
    const titulo = this.agregarNovedadFormGroup.value.novedadTitulo;
    const fecha = this.fecha;
    const cuerpo = this.agregarNovedadFormGroup.value.novedadCuerpo;
    const obj = {
      Nove_Id: id,
      Nove_Titulo: titulo,
      Nove_Fecha: fecha,
      Nove_Cuerpo: cuerpo,
    };
    this.noveService.postNovedades(obj).subscribe(() => {
      this.getNovedades();
      this.setValueVacio();
    });
  }

  formatDate() {
    const dia = this.agregarNovedadFormGroup.value.novedadFecha.getDate();
    const mes = this.agregarNovedadFormGroup.value.novedadFecha.getMonth();
    const ano = this.agregarNovedadFormGroup.value.novedadFecha.getFullYear();
    return (mes + 1) + '/' + dia + '/' + ano;
  }

  onSubmitEditar(formGroup) {
    const id = 0;
    const titulo = this.agregarNovedadFormGroup.value.novedadesTitulo;
    const fecha = this.agregarNovedadFormGroup.value.novedadesFecha;
    const cuerpo = this.agregarNovedadFormGroup.value.novedadesCuerpo;
    const obj = {
      Nove_Id: id,
      Nove_Titulo: titulo,
      Nove_Fecha: fecha,
      Nove_Cuerpo: cuerpo,
    };
    this.noveService.postNovedades(obj).subscribe(() => {
      this.getNovedades();
      this.setValueVacio();
      this.novedadSeleccionado = undefined;
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

  editNovedadNombreSelected(val) {
    if (val) {
      this.novedadSeleccionado = this.novedadesList.filter(novedad => novedad.id === val);
    }
  }

  setValueVacio() {
    if (this.agregar) {
      this.agregarNovedadFormGroup.controls.novedadTitulo.setValue('');
      this.agregarNovedadFormGroup.controls.novedadCuerpo.setValue('');
    }
    if (this.editar) {
      this.editarNovedadFormGroup.controls.editarSeleccionarNovedad.setValue('');
    }
  }

}
