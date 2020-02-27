import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModalPage } from './modal/modal.page';
import { ModalPageModule } from './modal/modal.module';
import { ComponentsModule } from './../shared/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    ModalPageModule,
    ComponentsModule
  ],
  declarations: [Tab1Page],
  entryComponents: [ModalPage],
})
export class Tab1PageModule {}
