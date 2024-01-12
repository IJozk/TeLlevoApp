import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustarViajePageRoutingModule } from './ajustar-viaje-routing.module';

import { AjustarViajePage } from './ajustar-viaje.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustarViajePageRoutingModule,
    SharedModule
  ],
  declarations: [AjustarViajePage]
})
export class AjustarViajePageModule {}
