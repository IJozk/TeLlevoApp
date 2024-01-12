import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarDispPage } from './publicar-disp.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarDispPage
  },
  {
    path: 'ajustar-viaje',
    loadChildren: () => import('./ajustar-viaje/ajustar-viaje.module').then( m => m.AjustarViajePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarDispPageRoutingModule {}
