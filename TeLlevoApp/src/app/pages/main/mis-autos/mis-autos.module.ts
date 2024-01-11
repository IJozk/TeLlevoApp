import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAutosPageRoutingModule } from './mis-autos-routing.module';

import { MisAutosPage } from './mis-autos.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAutosPageRoutingModule,
    SharedModule
  ],
  declarations: [MisAutosPage]
})
export class MisAutosPageModule {}
