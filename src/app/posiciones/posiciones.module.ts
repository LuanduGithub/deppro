import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PosicionesPage } from './posiciones.page';

import { ComponentsModule } from './../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: PosicionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [PosicionesPage]
})
export class PosicionesPageModule {}
