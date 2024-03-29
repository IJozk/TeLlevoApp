import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    CustomBtnComponent,
    LogoComponent,
    CardComponent
  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    CustomBtnComponent,
    LogoComponent,
    CardComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
