import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { UsuariosService } from './../../services/usuarios.service';
import { LoadingController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;
  mostrarMensajeError: boolean = false;
  userJson: string;
token:any;
  
  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private storage: Storage,
    public usuariosService: UsuariosService,
    private fcm: FCM,
  ) { }

  ngOnInit() {
    this.storage.set('user', '');
    this.mostrarMensajeError = false;
    
    this.loginFormGroup = new FormGroup({
      usuarioLogin: new FormControl('',[ Validators.required ]),
      passwordLogin: new FormControl('',[ Validators.required ])
    });

      this.fcm.getToken().then(token => {
        let tokenFirebase = token;
        this.token = tokenFirebase.toString();
      });
 
  }

  onSubmitLogin(form){

    let obj = {
      "username": form.value.passwordLogin,
      "password": form.value.usuarioLogin,
      "token": this.token
    }

    this.usuariosService.postUsuarioLogin(obj).subscribe((user) => {
      this.userJson = JSON.stringify(user);
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


  accesoNoUsario(){
    let user = {
      admin: false,
      nombre: "Invitado",
      usuarioId: 'invitado'
    }
    this.storage.set('user', user);
    this.router.navigate(['tabs']);
  }

}
