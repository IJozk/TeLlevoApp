import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { DetalleReserva } from 'src/app/models/detalleReserva.model';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-buscar-conductor',
  templateUrl: './buscar-conductor.page.html',
  styleUrls: ['./buscar-conductor.page.scss'],
})
export class BuscarConductorPage implements OnInit {
  

  form = new FormGroup({
    destino: new FormControl('', [Validators.required]),
    uidViaje: new FormControl(''),
    uidPasajero: new FormControl(''),
    estado: new FormControl(''),
    uid: new FormControl(''),
  })

  router = inject(Router);
  utilSvc= inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  
  loaded: any = false;
  viajes: Viaje[] = [];
  user: User = this.utilSvc.getFromLocalStorage('user');
  viaje: Viaje;

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

  async solAsiento(uid: string){
    const loading = await this.utilSvc.loading();
    await loading.present();
    this.viaje = await this.firebaseSvc.getviajeByUid(uid);
    let detRes: DetalleReserva;
    let path = `detalleViajes/`;

    delete this.form.value.destino;
    this.form.value.uidPasajero = this.user.uid;
    this.form.value.uidViaje = this.viaje.uid;
    this.form.value.estado = 'asignado';

    if (this.viaje.asientos != '0'){
    let asientos = +this.viaje.asientos - 1;

    await this.firebaseSvc.addDocument(path, this.form.value as DetalleReserva).then(res => {
      this.firebaseSvc.updateDocument(`detalleViajes/${res.id}`, 'uid',  res.id);
      console.log(detRes);
      this.firebaseSvc.updateDocument(`viajes/${this.viaje.uid}`, 'asientos',  asientos.toString());
      this.form.reset();

    }).catch(error => {
      console.log(error)

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
    }).finally(async () => {
      loading.dismiss();
      await this.router.navigateByUrl('/main');
    })
  }
}


}
