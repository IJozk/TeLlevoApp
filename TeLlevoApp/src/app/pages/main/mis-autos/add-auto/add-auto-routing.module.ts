import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAutoPage } from './add-auto.page';

const routes: Routes = [
  {
    path: '',
    component: AddAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAutoPageRoutingModule {}
