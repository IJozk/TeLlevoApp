import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Reserva } from 'src/app/models/reserva.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  name!: string;
  reserva!: string;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        let user: User = JSON.parse(localStorage.getItem('user'));
    this.name = "Usuario: "+user.nombre;
    let res: Reserva = JSON.parse(localStorage.getItem('reserva'));
    this.reserva =res.reserva;
    console.log(this.reserva);
      }
    });

    
    
  }

  salir(){
    this.utilsSvc.routerLink('/auth');
    console.log(this.reserva.toString());
    this.utilsSvc.saveInLocalStorage('user', '');
    this.utilsSvc.saveInLocalStorage('reserva', { "reserva": "" });  
    
  }

}
