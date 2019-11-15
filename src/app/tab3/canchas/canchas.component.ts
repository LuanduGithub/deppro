import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { CanchasService } from './../../services/canchas.service';
import { Comun, ComunList } from '../../models/modelsComunes';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.component.html',
  styleUrls: ['./canchas.component.scss'],
})
export class CanchasComponent implements OnInit {

  canchasList: Array<Comun>;
  canchaSeleccionada:Comun[];
  agregarCanchaFormGroup:FormGroup;
  editarCanchaFormGroup:FormGroup;
  token : any;
  result:any;

  @Input() agregar: boolean= false;
  @Input() editar: boolean= false;
  constructor(
    private fcm: FCM,
    private canchasService: CanchasService
  ) {
    

  }
  ngOnInit() {
    this.getCanchas();
    this.agregarCanchaFormGroup = new FormGroup({
      canchaNombre: new FormControl('',[ Validators.required ]),
    });
    this.editarCanchaFormGroup = new FormGroup({
      editarCanchaNombre: new FormControl('',[ Validators.required ]),
      editarCanchaNombreNuevo: new FormControl('',[ Validators.required ]),
    });
    this.fcm.getToken().then(token => {
      console.log(token)
      this.token = token;
      //backend.registerToken(token);
    });
 }


  getCanchas(){
    this.canchasService.getCanchas().subscribe(canchas => {
      let canchasList = canchas.msg
      this.canchasList = canchasList.sort(this.getSortOrder('nombre'));
    })
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


  onSubmitAgregar(formGroup)
  {
    
    let id = 0;
    let nombre = this.agregarCanchaFormGroup.value.canchaNombre;
    this.canchasService.postCancha(id, nombre).subscribe(() =>{
      this.getCanchas();
      this.setValueVacio();
    });
  }

  onSubmitEditar(formGroup)
  {
    let id = this.canchaSeleccionada[0].id;
    let nombre = this.editarCanchaFormGroup.value.editarCanchaNombreNuevo
    this.canchasService.postCancha(id, nombre).subscribe(() =>{
      this.getCanchas();
      this.setValueVacio();
      this.canchaSeleccionada = undefined;
    });
  }



  editCanchaNombreSelected(val){
    if(val){
      this.canchaSeleccionada = this.canchasList.filter(nombre => {return nombre.id == val});
      let nombre = this.canchaSeleccionada[0].nombre;
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.setValue(nombre);
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.enable();
    }
  }


  setValueVacio(){
    if(this.agregar){
      this.agregarCanchaFormGroup.controls.canchaNombre.setValue('')
      this.agregarCanchaFormGroup.controls.canchaNombre.setValue('');
    }
    if(this.editar){
      this.editarCanchaFormGroup.controls.editarCanchaNombre.setValue('');
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.setValue('');
      this.editarCanchaFormGroup.controls.editarCanchaNombreNuevo.disable();
    }
  }
}
