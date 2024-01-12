import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajustar-viaje',
  templateUrl: './ajustar-viaje.page.html',
  styleUrls: ['./ajustar-viaje.page.scss'],
})
export class AjustarViajePage implements OnInit {

  form = new FormGroup({
    asientos: new FormControl([]),
    destino: new FormControl([]),
    patente: new FormControl([]),
    montoAsiento: new FormControl([]),
  })

  constructor() { }

  ngOnInit() {
  }

}
