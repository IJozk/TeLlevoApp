import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'buscar-conductor',
    loadChildren: () => import('./buscar-conductor/buscar-conductor.module').then( m => m.BuscarConductorPageModule)
  },
  {
    path: 'publicar-disp',
    loadChildren: () => import('./publicar-disp/publicar-disp.module').then( m => m.PublicarDispPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path: 'viajes-realizados',
    loadChildren: () => import('./viajes-realizados/viajes-realizados.module').then( m => m.ViajesRealizadosPageModule)
  },
  {
    path: 'mis-autos',
    loadChildren: () => import('./mis-autos/mis-autos.module').then( m => m.MisAutosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
