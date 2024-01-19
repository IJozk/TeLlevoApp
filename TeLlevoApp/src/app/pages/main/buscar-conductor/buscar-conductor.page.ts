import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Viaje } from 'src/app/models/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-buscar-conductor',
  templateUrl: './buscar-conductor.page.html',
  styleUrls: ['./buscar-conductor.page.scss'],
})
export class BuscarConductorPage implements OnInit {
  loaded: any = false;
  viajes: Viaje[] = [];

  form = new FormGroup({
    destino: new FormControl('', [Validators.required]),
  })

  router = inject(Router);
  utilSvc= inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  ngOnInit() {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) { 
        await this.firebaseSvc.viajesAll().then( res =>{
          console.log(res);
          this.viajes = res;
        })
      }
    })
  }

  buscarDest(){
  }

  confirmarAsiento(){
    this.utilSvc.saveInLocalStorage('reserva', { "reserva": "true" });
    this.router.navigateByUrl('/main');
  }

}
