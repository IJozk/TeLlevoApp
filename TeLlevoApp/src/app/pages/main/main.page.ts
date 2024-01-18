import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva.model';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  viajeEnEjec: Viaje [];
  name!: string;
  reserva!: string;

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  router = inject(Router);

  async ngOnInit() {

    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) { 
        let user: User = JSON.parse(localStorage.getItem('user'));
        this.name = "Usuario: "+user.nombre;
        let res: Reserva = JSON.parse(localStorage.getItem('reserva'));
        this.reserva =res.reserva;
        console.log(user.email);
        await this.firebaseSvc.viajesbyOwner(user.email).then( viaje =>{
          this.utilSvc.saveInLocalStorage('viajeEnEjec', viaje);
          this.viajeEnEjec = viaje;
        })
      }
    });  
  } 

  async salir(){
    this.utilSvc.saveInLocalStorage('autos', [])
    localStorage.clear();
    this.utilSvc.routerLink('/auth');
  }

}
