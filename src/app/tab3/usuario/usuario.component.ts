import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../../models/modelsComunes';
import { UsuariosService } from './../../services/usuarios.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuarioList: Array<Usuario>;
  usuarioSeleccionado:Usuario[];
  agregarUsuarioFormGroup:FormGroup;
  editarUsuarioFormGroup:FormGroup;

  @Input() agregar: boolean= false;
  @Input() editar: boolean= false;

  constructor(
    private usuService: UsuariosService
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.agregarUsuarioFormGroup = new FormGroup({
      usuarioNombre: new FormControl('',[ Validators.required ]),
      usuarioTelefono: new FormControl('',[ Validators.required ]),
      usuarioMail: new FormControl('',[ Validators.required ]),
      usuarioTipo: new FormControl('',[ Validators.required ]),
      usuarioRol: new FormControl('',[ Validators.required ]),
      usuarioAliasNombre: new FormControl('',[ Validators.required ]),
      usuarioContrasena: new FormControl('',[ Validators.required ]),
      usuarioEstado: new FormControl('',[ Validators.required ])
    });
    this.editarUsuarioFormGroup = new FormGroup({
      editarSeleccionarUsuarioNombre: new FormControl('',[ Validators.required ]),
      editarUsuarioNombre: new FormControl('',[ Validators.required ]),
      editarUsuarioTelefono: new FormControl('',[ Validators.required ]),
      editarUsuarioMail: new FormControl('',[ Validators.required ]),
      editarUsuarioTipo: new FormControl('',[ Validators.required ]),
      editarUsuarioRol: new FormControl('',[ Validators.required ]),
      editarUsuarioAliasNombre: new FormControl('',[ Validators.required ]),
      editarUsuarioContrasena: new FormControl(''),
      editarUsuarioEstado: new FormControl('',[ Validators.required ])
    });
  }
  getUsuarios(){
    this.usuService.getUsuarios().subscribe(usuarios => {
      let usuarioList = usuarios.msg
      this.usuarioList = usuarioList.sort(this.getSortOrder('nombre'));
    })
  }
  onSubmitAgregar(formGroup)
  {
    let id = 0;
    let nombreApellido = this.agregarUsuarioFormGroup.value.usuarioNombre;
    let tel = this.agregarUsuarioFormGroup.value.usuarioTelefono;
    let mail = this.agregarUsuarioFormGroup.value.usuarioMail;
    let tipo = this.agregarUsuarioFormGroup.value.usuarioTipo;
    let rol = this.agregarUsuarioFormGroup.value.usuarioRol;
    let nombreUsuario = this.agregarUsuarioFormGroup.value.usuarioAliasNombre;
    let contrasena = this.agregarUsuarioFormGroup.value.usuarioContrasena;
    let activo = this.agregarUsuarioFormGroup.value.usuarioEstado;
    let obj= {
      Usu_Id : id,
      Usu_NomApe : nombreApellido,
      Usu_Tel : tel,
      Usu_Mail : mail,
      Usu_Tipo : tipo,
      Usu_EsAdmin : rol  === "SI"? true: false,
      Usu_NomUsu : nombreUsuario,
      Usu_Pass : contrasena,
      Usu_Activo : activo === "SI"? true: false,
    }
    this.usuService.postUsuario(obj).subscribe(() =>{
      this.getUsuarios();
      this.setValueVacio();
    });
  }

  onSubmitEditar(formGroup)
  {
    let id = this.usuarioSeleccionado[0].id;
    let nombreApellido = this.editarUsuarioFormGroup.value.editarUsuarioNombre;
    let tel = this.editarUsuarioFormGroup.value.editarUsuarioTelefono;
    let mail = this.editarUsuarioFormGroup.value.editarUsuarioMail;
    let tipo = this.editarUsuarioFormGroup.value.editarUsuarioTipo;
    let rol = this.editarUsuarioFormGroup.value.editarUsuarioRol;
    let nombreUsuario = this.editarUsuarioFormGroup.value.editarUsuarioAliasNombre;
    let contrasena = this.editarUsuarioFormGroup.value.editarUsuarioContrasena;
    let activo = this.editarUsuarioFormGroup.value.editarUsuarioEstado;
    let obj= {
      Usu_Id : id,
      Usu_NomApe : nombreApellido,
      Usu_Tel : tel,
      Usu_Mail : mail,
      Usu_Tipo : tipo,
      Usu_EsAdmin : rol  === "SI"? true: false,
      Usu_NomUsu : nombreUsuario,
      Usu_Pass : contrasena,
      Usu_Activo : activo === "SI"? true: false,
    }
    console.log(obj)
    this.usuService.postUsuario(obj).subscribe(() =>{
      this.getUsuarios();
      this.setValueVacio();
      this.usuarioSeleccionado = undefined;
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

editUsuarioNombreSelected(val){
    if(val){
      this.usuarioSeleccionado = this.usuarioList.filter(usuario => {return usuario.id == val});
      this.editarUsuarioFormGroup.controls.editarUsuarioNombre.setValue(this.usuarioSeleccionado[0].nombre);
      this.editarUsuarioFormGroup.controls.editarUsuarioTelefono.setValue(this.usuarioSeleccionado[0].telefono);
      this.editarUsuarioFormGroup.controls.editarUsuarioMail.setValue(this.usuarioSeleccionado[0].mail);
      this.editarUsuarioFormGroup.controls.editarUsuarioTipo.setValue(this.usuarioSeleccionado[0].tipo);
      this.editarUsuarioFormGroup.controls.editarUsuarioRol.setValue(this.usuarioSeleccionado[0].admin);
      this.editarUsuarioFormGroup.controls.editarUsuarioAliasNombre.setValue(this.usuarioSeleccionado[0].usuario)
      this.editarUsuarioFormGroup.controls.editarUsuarioEstado.setValue(this.usuarioSeleccionado[0].activo)
      console.log(this.usuarioSeleccionado )
   }
  }

  setValueVacio(){
    if(this.agregar){
      this.agregarUsuarioFormGroup.controls.usuarioNombre.setValue('')
      this.agregarUsuarioFormGroup.controls.usuarioNombre.setValue('');
    }
    if(this.editar){
      this.editarUsuarioFormGroup.controls.editarSeleccionarUsuarioNombre.setValue('');
    }
  }
  

}
