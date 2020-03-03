import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comun } from './../../models/modelsComunes';
import { EquipoService } from './../../services/equipo.service';

import { Base64 } from '@ionic-native/base64/ngx';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser} from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {
  equiposList: Array<Comun>;
  equipoSeleccionado: Comun[];
  agregarEquipoFormGroup: FormGroup;
  editarEquipoFormGroup: FormGroup;

  @Input() agregar = false;
  @Input() editar = false;
  equipos: any;
  imgUpload: string;
  constructor(
    private equipoService: EquipoService,
    private base64: Base64,
    private fileChooser: FileChooser,
    private filePath: FilePath

  ) {


  }
  ngOnInit() {
    this.getEquipoList();
    this.agregarEquipoFormGroup = new FormGroup({
      equipoNombre: new FormControl('', [Validators.required]),
    });
    this.editarEquipoFormGroup = new FormGroup({
      editarEquipoNombre: new FormControl('', [Validators.required]),
      editarEquipoNombreNuevo: new FormControl({ value: '', disabled: true }, Validators.required),
    });

  }
  getEquipoList() {
    this.equipos = this.equipoService.getEquipos().subscribe(equipo => {
      const equiposList = equipo.msg;
      this.equiposList = equiposList.sort(this.getSortOrder('nombre'));
    });
  }
  ionViewWillLeave() {
    this.equipos.unsubscribe();
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
    const id = 0;
    const nombre = this.agregarEquipoFormGroup.value.equipoNombre;
    this.equipoService.postEquipo(id, nombre).subscribe(() => {
      this.getEquipoList();
      this.setValueVacio();
    });
  }

  onSubmitEditar(formGroup) {
    const id = this.equipoSeleccionado[0].id;
    const nombre = this.editarEquipoFormGroup.value.editarEquipoNombreNuevo;
    this.equipoService.postEquipo(id, nombre).subscribe(() => {
      this.getEquipoList();
      this.setValueVacio();
      this.equipoSeleccionado = undefined;
    });
  }



  editEquipoNombreSelected(val) {
    if (val) {
      const valNumber = parseInt(val, 10);
      this.equipoSeleccionado = this.equiposList.filter(n => n.id === valNumber);
      const nombre = this.equipoSeleccionado[0].nombre;
      this.editarEquipoFormGroup.controls.editarEquipoNombreNuevo.setValue(nombre);
      this.editarEquipoFormGroup.controls.editarEquipoNombreNuevo.enable();
    }
  }


  setValueVacio() {
    if (this.agregar) {
      this.agregarEquipoFormGroup.controls.equipoNombre.setValue('');
      this.agregarEquipoFormGroup.controls.equipoNombre.setValue('');
    }
    if (this.editar) {
      this.editarEquipoFormGroup.controls.editarEquipoNombre.setValue('');
      this.editarEquipoFormGroup.controls.editarEquipoNombreNuevo.setValue('');
      this.editarEquipoFormGroup.controls.editarEquipoNombreNuevo.disable();
    }
  }

  pickFile() {
    this.fileChooser.open().then((fileURL) => {
      this.filePath.resolveNativePath(fileURL).then((nativePath) => {
        this.base64.encodeFile(nativePath).then((base64string) => {
          alert(base64string);
          this.imgUpload = 'base64string';
        });
      });
    });
  }

  convertToBase64(filePath) {
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
    }, (err) => {
      console.log(err);
    });
  }
}
