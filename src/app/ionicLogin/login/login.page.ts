import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  mostrarMensajeError = false;
  userJson: string;
  token: any;
  obj: { username: any; password: any; token: any; };

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private storage: Storage,
    public usuariosService: UsuariosService,
    private fcm: FCM,
  ) { }

  ngOnInit() {
    this.loadUser();
    this.mostrarMensajeError = false;
    this.loginFormGroup = new FormGroup({
      usuarioLogin: new FormControl('', [Validators.required]),
      passwordLogin: new FormControl('', [Validators.required])
    });

  }

  onSubmitLogin(form) {

    const obj = {
      username: form.value.passwordLogin,
      password: form.value.usuarioLogin,
      token: this.token
    };
    this.usuariosService.postUsuarioLogin(obj).subscribe((user) => {
      this.userJson = JSON.stringify(user);
      user.success ? this.successTrue(user.msg) : this.successFalse();

    });
  }
  successTrue(user) {
    this.storage.set('user', user);

    this.storage.get('user').then((userStorage) => {
      console.log(userStorage);
    });
    // this.router.navigate(['tabs']);
  }
  successFalse() {
    this.mostrarMensajeError = true;
    this.loginFormGroup.controls.usuarioLogin.setValue('');
    this.loginFormGroup.controls.passwordLogin.setValue('');
  }


  accesoNoUsario() {
    const user = {
      admin: false,
      nombre: 'Invitado',
      usuarioId: 'invitado'
    };

    this.storage.set(`setting:user`, user);
    this.router.navigate(['tabs']);
  }

  loadUser() {
    this.storage.get('user').then((user) => {
      if (user) {
        this.router.navigate(['tabs']);
      } else {
        this.fcm.getToken().then(token => {
          const tokenFirebase = token;
          this.token = tokenFirebase.toString();
        });
      }
    });
  }
}
