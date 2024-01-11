import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarConductorPageRoutingModule } from './buscar-conductor-routing.module';

import { BuscarConductorPage } from './buscar-conductor.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarConductorPageRoutingModule,
    SharedModule
  ],
  declarations: [BuscarConductorPage]
})
export class BuscarConductorPageModule {}
