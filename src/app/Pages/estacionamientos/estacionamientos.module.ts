import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstacionamientosPageRoutingModule } from './estacionamientos-routing.module';

import { EstacionamientosPage } from './estacionamientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstacionamientosPageRoutingModule
  ],
  declarations: [EstacionamientosPage]
})
export class EstacionamientosPageModule {}
