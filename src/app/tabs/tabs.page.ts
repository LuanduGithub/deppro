import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioLoginPost } from '../models/modelsComunes';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userAdmin: any;
  constructor(
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.loadUser();
  }
  loadUser() {
    this.storage.get('user').then(user => {
      this.userAdmin = user.admin;
    });
  }

}
