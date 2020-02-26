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
  usuarioSeleccionado: Usuario[];
  agregarUsuarioFormGroup: FormGroup;
  editarUsuarioFormGroup: FormGroup;

  @Input() agregar = false;
  @Input() editar = false;

  constructor(
    private usuService: UsuariosService
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.agregarUsuarioFormGroup = new FormGroup({
      usuarioNombre: new FormControl('', [ Validators.required ]),
      usuarioTelefono: new FormControl('', [ Validators.required ]),
      usuarioMail: new FormControl('', [ Validators.required ]),
      usuarioTipo: new FormControl('', [ Validators.required ]),
      usuarioRol: new FormControl('', [ Validators.required ]),
      usuarioAliasNombre: new FormControl('', [ Validators.required ]),
      usuarioContrasena: new FormControl('', [ Validators.required ]),
      usuarioEstado: new FormControl('', [ Validators.required ])
    });
    this.editarUsuarioFormGroup = new FormGroup({
      editarSeleccionarUsuarioNombre: new FormControl('', [ Validators.required ]),
      editarUsuarioNombre: new FormControl('', [ Validators.required ]),
      editarUsuarioTelefono: new FormControl('', [ Validators.required ]),
      editarUsuarioMail: new FormControl('', [ Validators.required ]),
      editarUsuarioTipo: new FormControl('', [ Validators.required ]),
      editarUsuarioRol: new FormControl('', [ Validators.required ]),
      editarUsuarioAliasNombre: new FormControl('', [ Validators.required ]),
      editarUsuarioContrasena: new FormControl(''),
      editarUsuarioEstado: new FormControl('', [ Validators.required ])
    });
  }
  getUsuarios() {
    this.usuService.getUsuarios().subscribe(usuarios => {
      const usuarioList = usuarios.msg;
      this.usuarioList = usuarioList.sort(this.getSortOrder('nombre'));
    });
  }
  onSubmitAgregar(formGroup) {
    const id = 0;
    const nombreApellido = this.agregarUsuarioFormGroup.value.usuarioNombre;
    const tel = this.agregarUsuarioFormGroup.value.usuarioTelefono;
    const mail = this.agregarUsuarioFormGroup.value.usuarioMail;
    const tipo = this.agregarUsuarioFormGroup.value.usuarioTipo;
    const rol = this.agregarUsuarioFormGroup.value.usuarioRol;
    const nombreUsuario = this.agregarUsuarioFormGroup.value.usuarioAliasNombre;
    const contrasena = this.agregarUsuarioFormGroup.value.usuarioContrasena;
    const activo = this.agregarUsuarioFormGroup.value.usuarioEstado;
    const obj = {
      Usu_Id : id,
      Usu_NomApe : nombreApellido,
      Usu_Tel : tel,
      Usu_Mail : mail,
      Usu_Tipo : tipo,
      Usu_EsAdmin : rol  === 'SI' ? true : false,
      Usu_NomUsu : nombreUsuario,
      Usu_Pass : contrasena,
      Usu_Activo : activo === 'SI' ? true : false,
    };
    this.usuService.postUsuario(obj).subscribe(() => {
      this.getUsuarios();
      this.setValueVacio();
    });
  }

  onSubmitEditar(formGroup) {
    const id = this.usuarioSeleccionado[0].id;
    const nombreApellido = this.editarUsuarioFormGroup.value.editarUsuarioNombre;
    const tel = this.editarUsuarioFormGroup.value.editarUsuarioTelefono;
    const mail = this.editarUsuarioFormGroup.value.editarUsuarioMail;
    const tipo = this.editarUsuarioFormGroup.value.editarUsuarioTipo;
    const rol = this.editarUsuarioFormGroup.value.editarUsuarioRol;
    const nombreUsuario = this.editarUsuarioFormGroup.value.editarUsuarioAliasNombre;
    const contrasena = this.editarUsuarioFormGroup.value.editarUsuarioContrasena;
    const activo = this.editarUsuarioFormGroup.value.editarUsuarioEstado;
    const obj = {
      Usu_Id : id,
      Usu_NomApe : nombreApellido,
      Usu_Tel : tel,
      Usu_Mail : mail,
      Usu_Tipo : tipo,
      Usu_EsAdmin : rol  === 'SI' ? true : false,
      Usu_NomUsu : nombreUsuario,
      Usu_Pass : contrasena,
      Usu_Activo : activo === 'SI' ? true : false,
    };
    console.log(obj);
    this.usuService.postUsuario(obj).subscribe(() => {
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
  };
}

editUsuarioNombreSelected(val) {
    if (val) {
      this.usuarioSeleccionado = this.usuarioList.filter(usuario => usuario.id === val);
      this.editarUsuarioFormGroup.controls.editarUsuarioNombre.setValue(this.usuarioSeleccionado[0].nombre);
      this.editarUsuarioFormGroup.controls.editarUsuarioTelefono.setValue(this.usuarioSeleccionado[0].telefono);
      this.editarUsuarioFormGroup.controls.editarUsuarioMail.setValue(this.usuarioSeleccionado[0].mail);
      this.editarUsuarioFormGroup.controls.editarUsuarioTipo.setValue(this.usuarioSeleccionado[0].tipo);
      this.editarUsuarioFormGroup.controls.editarUsuarioRol.setValue(this.usuarioSeleccionado[0].admin);
      this.editarUsuarioFormGroup.controls.editarUsuarioAliasNombre.setValue(this.usuarioSeleccionado[0].usuario);
      this.editarUsuarioFormGroup.controls.editarUsuarioEstado.setValue(this.usuarioSeleccionado[0].activo);
      console.log(this.usuarioSeleccionado );
   }
  }

  setValueVacio() {
    if (this.agregar) {
      this.agregarUsuarioFormGroup.controls.usuarioNombre.setValue('');
      this.agregarUsuarioFormGroup.controls.usuarioNombre.setValue('');
    }
    if (this.editar) {
      this.editarUsuarioFormGroup.controls.editarSeleccionarUsuarioNombre.setValue('');
    }
  }


}
