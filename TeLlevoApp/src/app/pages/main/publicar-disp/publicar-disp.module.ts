import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarDispPageRoutingModule } from './publicar-disp-routing.module';

import { PublicarDispPage } from './publicar-disp.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicarDispPageRoutingModule,
    SharedModule
  ],
  declarations: [PublicarDispPage]
})
export class PublicarDispPageModule {}
