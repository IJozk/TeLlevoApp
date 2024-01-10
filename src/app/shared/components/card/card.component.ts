import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  // PARAMETROS
  // Tipo de input que se utilizará
  @Input() title!: string;
  // Para identificar el input en el cual estamos escribiendo necesitamos un label
  @Input() img!: string;
  // Para ingresar un icono en un campo
  @Input() label!: string;
  // Para ingresar un icono en un campo
  @Input() content!: string;


  constructor() { }

  ngOnInit() {}

}
