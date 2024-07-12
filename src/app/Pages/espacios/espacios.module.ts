import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspaciosPageRoutingModule } from './espacios-routing.module';

import { EspaciosPage } from './espacios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspaciosPageRoutingModule
  ],
  declarations: [EspaciosPage]
})
export class EspaciosPageModule {}
