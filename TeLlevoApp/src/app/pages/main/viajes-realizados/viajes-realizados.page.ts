import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-viajes-realizados',
  templateUrl: './viajes-realizados.page.html',
  styleUrls: ['./viajes-realizados.page.scss'],
})
export class ViajesRealizadosPage implements OnInit {

  loaded: boolean = false;
  router= inject(Router);
  firebaseSvc= inject(FirebaseService);
  viajes: Viaje[]= [];
  user: User = JSON.parse(localStorage.getItem('user'));

  async ngOnInit() {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) { 
        await this.firebaseSvc.viajesbyOwner(this.user.email).then( res =>{
          console.log(res);
          this.viajes = res;
        })
      }
    })
  }

}
