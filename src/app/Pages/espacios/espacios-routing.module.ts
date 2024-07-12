import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspaciosPage } from './espacios.page';

const routes: Routes = [
  {
    path: '',
    component: EspaciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaciosPageRoutingModule {}
