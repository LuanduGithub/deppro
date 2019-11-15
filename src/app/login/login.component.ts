import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { UsuariosService } from './../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  mostrarMensajeError: boolean = false;
  
  constructor(
    private router: Router,
    private storage: Storage,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.storage.set('user', '');
    this.mostrarMensajeError = false;
    this.loginFormGroup = new FormGroup({
      usuarioLogin: new FormControl('',[ Validators.required ]),
      passwordLogin: new FormControl('',[ Validators.required ])
    });
  }

  onSubmitLogin(form){
    let obj = {
      "username": form.value.passwordLogin,
      "password": form.value.usuarioLogin
    }
    this.usuariosService.postUsuarioLogin(obj).subscribe(user => {
      user.success ?  this.successTrue(user.msg): this.successFalse();
    });
  }
  successTrue(user){
    this.storage.set('user', user);
    this.router.navigate(['tabs']);
  }
  successFalse(){
    this.mostrarMensajeError = true;
    this.loginFormGroup.controls.usuarioLogin.setValue('');
    this.loginFormGroup.controls.passwordLogin.setValue('');
  }
}
