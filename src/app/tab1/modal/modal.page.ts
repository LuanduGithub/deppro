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
  @Input() type: string;
  aceptarPartido: boolean;
  eliminarPartido: boolean;

  constructor(
    public modalController: ModalController,
    private designacionesService: DesignacionesService
  ) { }

  ngOnInit() {
    this.type === 'aceptar' ? this.aceptarPartido = true : this.aceptarPartido = false;
    this.type === 'eliminar' ? this.eliminarPartido = true : this.eliminarPartido = false;
  }
  cancelar() {
    this.modalController.dismiss();
  }
  onSubmitAceptar() {
    const obj = {
      designacionId: this.data.id,
      usuarioId: this.user.usuarioId
    };
    if (this.aceptarPartido) {
      this.designacionesService.postDesignacionesConfirmar(obj).subscribe(() => {
        this.modalController.dismiss();
        return;
      });
    }
    if (this.eliminarPartido) {
      const objId = {
        id: this.data.id
      };
      this.designacionesService.deleteDesignaciones(objId).subscribe(() => {
        this.modalController.dismiss();
        return;
      });
    }

  }
}
