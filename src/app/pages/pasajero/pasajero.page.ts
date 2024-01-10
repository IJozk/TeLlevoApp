import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  form = new FormGroup({
    inicio : new FormControl('', Validators.required),
    destino : new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit() {
  }

}
