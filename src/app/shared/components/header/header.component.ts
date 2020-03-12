import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {}
  logout() {
    this.storage.set(`setting:user`, '');
    this.router.navigate(['']);
  }
}
