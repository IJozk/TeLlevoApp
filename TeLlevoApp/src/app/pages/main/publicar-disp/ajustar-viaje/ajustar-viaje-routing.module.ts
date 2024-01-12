import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustarViajePage } from './ajustar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: AjustarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustarViajePageRoutingModule {}
