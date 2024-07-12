import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncomiendasPageRoutingModule } from './encomiendas-routing.module';

import { EncomiendasPage } from './encomiendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncomiendasPageRoutingModule
  ],
  declarations: [EncomiendasPage]
})
export class EncomiendasPageModule {}
