import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

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

  router = inject(Router);
  utilSvc= inject(UtilsService);

  ngOnInit() {
  }

  confirmarviaje(){
    this.utilSvc.saveInLocalStorage('reserva', { "reserva": "false" });
    this.router.navigateByUrl('/main');
  }

}
