import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-buscar-conductor',
  templateUrl: './buscar-conductor.page.html',
  styleUrls: ['./buscar-conductor.page.scss'],
})
export class BuscarConductorPage implements OnInit {
  loaded: any = false;

  router = inject(Router);
  utilSvc= inject(UtilsService);

  ngOnInit() {
  }

  confirmarAsiento(){
    this.utilSvc.saveInLocalStorage('reserva', { "reserva": "true" });
    this.router.navigateByUrl('/main');
  }

}
