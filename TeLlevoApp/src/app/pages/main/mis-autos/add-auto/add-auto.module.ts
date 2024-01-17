import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAutoPageRoutingModule } from './add-auto-routing.module';

import { AddAutoPage } from './add-auto.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAutoPageRoutingModule,
    SharedModule
    ],
  declarations: [AddAutoPage]
})
export class AddAutoPageModule {}
