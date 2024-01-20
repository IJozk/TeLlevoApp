import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Auto } from 'src/app/models/auto.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-publicar-disp',
  templateUrl: './publicar-disp.page.html',
  styleUrls: ['./publicar-disp.page.scss'],
})
export class PublicarDispPage implements OnInit {

  loaded: boolean = false;
  autos1: Auto[] = [];
  cont: string;

  fireSvc = inject(FirebaseService);
  router = inject(Router);
  utilSvc = inject(UtilsService);

  async ngOnInit() {
    
    let user: User = this.utilSvc.getFromLocalStorage('user');
    let email: string= user.email;

    await this.utilSvc.saveInLocalStorage('autos', []);
    await this.fireSvc.autosByOwner(email).then( autos1 => {
      this.utilSvc.saveInLocalStorage('autos', autos1);
      for (let i in autos1) {
        const auto: Auto = autos1[i];
        this.autos1.push(auto);
      }
    }).catch( error => {
      console.log(error);
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
    })
  }

  crearViaje(patente: string, maxAsientos: string){
    this.utilSvc.saveInLocalStorage('auto-select', {'patente': patente, 'maxAsientos': maxAsientos});
    console.log(this.utilSvc.getFromLocalStorage('auto-select'));
    this.router.navigateByUrl('/main/publicar-disp/ajustar-viaje');
  }

}
