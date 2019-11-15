import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Tab3Page } from './tab3.page';

import { CanchasComponent } from './canchas/canchas.component';
import { EquiposComponent } from './equipos/equipos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NovedadesComponent } from './novedades/novedades.component';

import { CanchasService } from './../services/canchas.service';
import { UsuariosService } from './../services/usuarios.service';
import { EquipoService } from './../services/equipo.service';
import { CategoriaService } from './../services/categoria.service';
import { NovedadesService } from './../services/novedades.service';

/**
 * no hay necesidad de importar los providers, por costumbre lo hice.
 */
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [
    Tab3Page,
    CanchasComponent,
    EquiposComponent,
    CategoriasComponent,
    UsuarioComponent,
    NovedadesComponent
  ],
  providers: [
    CanchasService,
    UsuariosService,
    EquipoService,
    CategoriaService,
    NovedadesService
  ],
})
export class Tab3PageModule {}
