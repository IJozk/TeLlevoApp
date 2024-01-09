import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  // PARAMETROS
  @Input() control!: FormControl;
  // Tipo de input que se utilizará
  @Input() type!: string;
  // Para identificar el input en el cual estamos escribiendo necesitamos un label
  @Input() label!: string;
  // Para determinar si un campo se autocompleta, necesitaremos otra variable
  @Input() autocomplete!: string;
  // Para ingresar un icono en un campo
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.type=='password') this.isPassword=true;
  }

  // funcion que muestra u oculta la contraseña del usuario
  showOrHidePass(){
    this.hide = !this.hide;

    if (this.hide) this.type= 'password';
    else this.type= 'text'
  }

}
