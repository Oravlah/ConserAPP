import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

/*
Esta page es el tab-inicial
*/

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path: 'visitas',
        loadChildren: () => import('./../../Pages/visitas/visitas.module').then( m => m.VisitasPageModule)
      },
      {
        path: 'encomiendas',
        loadChildren: () => import('./../../Pages/encomiendas/encomiendas.module').then( m => m.EncomiendasPageModule)
      },
      {
        path: 'estacionamientos',
        loadChildren: () => import('./../../Pages/estacionamientos/estacionamientos.module').then( m => m.EstacionamientosPageModule)
      },
      {
        path: 'espacios',
        loadChildren: () => import('./../../Pages/espacios/espacios.module').then( m => m.EspaciosPageModule)
      },
      {
        path: 'mudanzas',
        loadChildren: () => import('./../../Pages/mudanzas/mudanzas.module').then( m => m.MudanzasPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
