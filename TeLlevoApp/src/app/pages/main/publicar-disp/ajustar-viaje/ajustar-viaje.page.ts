import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auto } from 'src/app/models/auto.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ajustar-viaje',
  templateUrl: './ajustar-viaje.page.html',
  styleUrls: ['./ajustar-viaje.page.scss'],
})
export class AjustarViajePage implements OnInit {

  router = inject(Router);
  utilSvc= inject(UtilsService);

  autoSelect : Auto = this.utilSvc.getFromLocalStorage('auto-select');
  patente = this.autoSelect.patente;
  maxAsientos : number = +this.autoSelect.maxAsientos;

  form = new FormGroup({
    asientos: new FormControl('', [Validators.required, Validators.max(this.maxAsientos)]),
    destino: new FormControl('', [Validators.required]),
    patente: new FormControl( this.patente , [Validators.required]),
    montoAsiento: new FormControl('', [Validators.required]),
  })
  
  

  
  ngOnInit() {
    
    console.log(this.patente)

  }


  


  confirmarviaje(){
    this.utilSvc.saveInLocalStorage('reserva', { "reserva": "false" });
    this.router.navigateByUrl('/main');
  }

}
