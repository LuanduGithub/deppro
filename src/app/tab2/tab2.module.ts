import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ComponentsModule } from './../shared/components/components.module';
import { ModalTab2Page } from './modal/modal/modal.page';
import { ModalTab2PageModule } from './modal/modal/modal.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    ComponentsModule,
    ModalTab2PageModule,
  ],
  declarations: [Tab2Page],
  entryComponents: [ModalTab2Page],
})
export class Tab2PageModule {}
