import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudanzasPageRoutingModule } from './mudanzas-routing.module';

import { MudanzasPage } from './mudanzas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudanzasPageRoutingModule
  ],
  declarations: [MudanzasPage]
})
export class MudanzasPageModule {}
