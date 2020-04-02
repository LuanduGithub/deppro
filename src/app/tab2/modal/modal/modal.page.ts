import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NovedadesService } from './../../../services/novedades.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})


export class ModalTab2Page implements OnInit {

  @Input() data: any;

  constructor(
    public modalController: ModalController,
    private novedadesService: NovedadesService
  ) { }


  ngOnInit() {
  }
  cancelar() {
    this.modalController.dismiss();
  }
  onSubmitAceptar() {
    const obj = {
      id: this.data.id,
    };
    this.novedadesService.deleteNovedades(obj).subscribe(() => {
      this.modalController.dismiss();
      return;
    });
  }
}
