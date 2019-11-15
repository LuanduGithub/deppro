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
  novedadSeleccionado:Novedades[];
  agregarNovedadFormGroup:FormGroup;
  editarNovedadFormGroup:FormGroup;

  @Input() agregar: boolean= false;
  @Input() editar: boolean= false;
  fecha: string;
  constructor(
    private noveService: NovedadesService
  ) { }

  ngOnInit() {
    
    this.getNovedades();
    this.agregarNovedadFormGroup = new FormGroup({
      novedadTitulo: new FormControl('',[ Validators.required ]),
      novedadCuerpo: new FormControl('',[ Validators.required ]),
      novedadFecha: new FormControl(new Date()),
    });
    this.editarNovedadFormGroup = new FormGroup({
      editarSeleccionarNovedadNombre: new FormControl('',[ Validators.required ]),
      editarNovedadTitulo: new FormControl('',[ Validators.required ]),
      editarNovedadCuerpo: new FormControl('',[ Validators.required ]),
      editarNovedadFecha: new FormControl(new Date()),
    });
    this.fecha = this.formatDate();
  }

  getNovedades(){
    this.noveService.getNovedades().subscribe(novedades => {
      let novedadesList = novedades.msg
      this.novedadesList = novedadesList.sort(this.getSortOrder('nombre'));
    })
  }
  onSubmitAgregar(formGroup)
  {
    let id = 0;
    let titulo = this.agregarNovedadFormGroup.value.novedadTitulo;
    let fecha = this.fecha;
    let cuerpo = this.agregarNovedadFormGroup.value.novedadCuerpo;
    let obj= {
      Nove_Id : id,
      Nove_Titulo : titulo,
      Nove_Fecha : fecha,
      Nove_Cuerpo : cuerpo,
    }
     this.noveService.postNovedades(obj).subscribe(() =>{
      this.getNovedades();
      this.setValueVacio();
    });
  }

  formatDate() {
    let dia = this.agregarNovedadFormGroup.value.novedadFecha.getDate();
    let mes = this.agregarNovedadFormGroup.value.novedadFecha.getMonth();
    let ano = this.agregarNovedadFormGroup.value.novedadFecha.getFullYear();
    return (mes + 1) + '/' + dia + '/' + ano;
  }

  onSubmitEditar(formGroup)
  {
    let id = 0;
    let titulo = this.agregarNovedadFormGroup.value.novedadesTitulo;
    let fecha = this.agregarNovedadFormGroup.value.novedadesFecha;
    let cuerpo = this.agregarNovedadFormGroup.value.novedadesCuerpo;
    let obj= {
      Nove_Id : id,
      Nove_Titulo : titulo,
      Nove_Fecha : fecha,
      Nove_Cuerpo : cuerpo,
    }
    this.noveService.postNovedades(obj).subscribe(() =>{
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
  }  
}

editNovedadNombreSelected(val){
    if(val){
      this.novedadSeleccionado = this.novedadesList.filter(novedad => {return novedad.id == val});
   }
  }

  setValueVacio(){
    if(this.agregar){
      this.agregarNovedadFormGroup.controls.novedadTitulo.setValue('')
      this.agregarNovedadFormGroup.controls.novedadCuerpo.setValue('');
    }
    if(this.editar){
      this.editarNovedadFormGroup.controls.editarSeleccionarNovedad.setValue('');
    }
  }

}
