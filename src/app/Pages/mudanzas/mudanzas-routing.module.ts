import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudanzasPage } from './mudanzas.page';

const routes: Routes = [
  {
    path: '',
    component: MudanzasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MudanzasPageRoutingModule {}
