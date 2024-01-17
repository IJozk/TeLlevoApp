import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAutosPage } from './mis-autos.page';

const routes: Routes = [
  {
    path: '',
    component: MisAutosPage
  },
  {
    path: 'add-auto',
    loadChildren: () => import('./add-auto/add-auto.module').then( m => m.AddAutoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAutosPageRoutingModule {}
