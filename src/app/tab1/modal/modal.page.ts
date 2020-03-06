import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DesignacionesService } from './../../services/designaciones.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() data: any;
  @Input() user: any;
  constructor(
    public modalController: ModalController,
    private designacionesService: DesignacionesService
  ) { }

  ngOnInit() {
  }
  cancelar() {
    this.modalController.dismiss();
  }
  onSubmitAceptar() {
    const obj = {
      designacionId: this.data.id,
      usuarioId: this.user.usuarioId
    };
    this.designacionesService.postDesignacionesConfirmar(obj).subscribe(() => {
      this.modalController.dismiss();
    });
  }
}
