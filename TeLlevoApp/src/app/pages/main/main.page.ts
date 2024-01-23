import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DetalleReserva } from 'src/app/models/detalleReserva.model';
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

  viajeEnEjec: Viaje;
  viajePasajero: Viaje;
  name!: string;
  reserva!: DetalleReserva;

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  router = inject(Router);

  async ngOnInit() {
        const loading = await this.utilSvc.loading();
        await loading.present();
        let user: User = JSON.parse(localStorage.getItem('user'));
        this.name = "Usuario: "+user.nombre;
        await this.firebaseSvc.getDetViajeByUser(user.uid).then(async (res: DetalleReserva) =>{
          if(res && res.estado!= ('finalizado' || 'cancelado' )){
          console.log('hola1 ');
          this.utilSvc.saveInLocalStorage('reserva', res);
          this.reserva = res;
          await this.firebaseSvc.getviajeByUid(res.uidViaje).then( viaje =>{
            this.utilSvc.saveInLocalStorage('viajePasajero', viaje);
            this.viajePasajero = viaje;
          })
          }
          else{
            await this.firebaseSvc.viajebyOwner(user.email).then( viaje =>{
              this.utilSvc.saveInLocalStorage('viajeEnEjec', viaje);
              this.viajeEnEjec = viaje;
            })
          }
        }).catch( error => {
          console.log(error)
          this.utilSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline'
          })
        }).finally( () => {
          this.router.navigateByUrl('/main');
          loading.dismiss();
        })
      }

  async salir(){
    this.utilSvc.saveInLocalStorage('autos', []);
    localStorage.clear();
    this.utilSvc.routerLink('/auth');
  }

  async cambioEstado(){
    const loading = await this.utilSvc.loading();
    await loading.present();
    let user: User = JSON.parse(localStorage.getItem('user'));
    await this.firebaseSvc.viajebyOwner(user.email).then( async viaje =>{
      this.utilSvc.saveInLocalStorage('viajeEnEjec', viaje);
      this.viajeEnEjec = viaje;
      this.firebaseSvc.updateDocument(`viajes/${this.viajeEnEjec.uid}`, 'estado', 'iniciado');
    }).catch( error => {
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
      console.log(error)
    }).finally(() => {
      this.utilSvc.presentToast({
      message: `Viaje Iniciado`,
      duration: 2500,
      color: 'success',
      position: 'middle',
      icon: 'person-circle-outline'})
      this.router.navigateByUrl('/main').then(()=>{
        location.reload();
      })
    })
  }

  async cancelarViaje(){
    const loading = await this.utilSvc.loading();
    await loading.present();
    let user: User = JSON.parse(localStorage.getItem('user'));
    await this.firebaseSvc.viajebyOwner(user.email).then( async viaje =>{
      this.utilSvc.saveInLocalStorage('viajeEnEjec', viaje);
      this.viajeEnEjec = viaje;
      console.log(this.viajeEnEjec.uid);
      this.firebaseSvc.updateDocument(`viajes/${this.viajeEnEjec.uid}`, 'estado', 'cancelado');
      this.utilSvc.saveInLocalStorage('viajeEnEjec', null);
    }).catch( error => {
      console.log(error)

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
    }).finally(async () => {
      await this.utilSvc.presentToast({
        message: `Viaje cancelado`,
        duration: 5000,
        color: 'danger',
        position: 'middle',
        icon: 'person-circle-outline'})
        this.router.navigateByUrl('/main').then(()=>{
        location.reload();
      })
    })
  }

  async finalizarViaje(){
    const loading = await this.utilSvc.loading();
    await loading.present();
    let user: User = JSON.parse(localStorage.getItem('user'));
    await this.firebaseSvc.viajebyOwner(user.email).then( async viaje =>{
      this.utilSvc.saveInLocalStorage('viajeEnEjec', viaje);
      this.viajeEnEjec = viaje;
      console.log(this.viajeEnEjec.uid);
      this.firebaseSvc.updateDocument(`viajes/${this.viajeEnEjec.uid}`, 'estado', 'finalizado');
      this.utilSvc.saveInLocalStorage('viajeEnEjec', null);
    }).catch( error => {
      console.log(error)
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
    }).finally(async () => {
      await this.utilSvc.presentToast({
        message: `Viaje finalizado`,
        duration: 5000,
        color: 'danger',
        position: 'middle',
        icon: 'person-circle-outline'})
        this.router.navigateByUrl('/main').then(()=>{
          location.reload();
        })
    })
  }


  async finalizarViajePasajero(){
    const loading = await this.utilSvc.loading();
    await loading.present();
    let user: User = JSON.parse(localStorage.getItem('user'));
    await this.firebaseSvc.viajebyOwner(user.email).then( async () =>{
      await this.firebaseSvc.updateDocument(`detalleViajes/${this.reserva.uid}`, 'estado', 'finalizado');
      this.utilSvc.saveInLocalStorage('viajePasajero', null); 
    }).catch( error => {
      console.log(error)
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
    }).finally(async () => {
      await this.utilSvc.presentToast({
        message: `Viaje finalizado`,
        duration: 5000,
        color: 'danger',
        position: 'middle',
        icon: 'person-circle-outline'})
        this.router.navigateByUrl('/main').then(()=>{
          location.reload();
        })
    })
  }

  async cancelarViajePasajero(){
    const loading = await this.utilSvc.loading();
    await loading.present();
    let asientos = +this.viajePasajero.asientos + 1;
    await this.firebaseSvc.updateDocument(`viajes/${this.reserva.uidViaje}`, 'asientos', asientos.toString()).then(async () => {
      await this.firebaseSvc.updateDocument(`detalleViajes/${this.reserva.uid}`, 'estado', 'cancelado');
      this.utilSvc.saveInLocalStorage('viajePasajero', null); 
    }).catch( error => {
      console.log(error)
      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'})
    }).finally(async () => {
      await this.utilSvc.presentToast({
        message: `Viaje finalizado`,
        duration: 5000,
        color: 'danger',
        position: 'middle',
        icon: 'person-circle-outline'})
        this.router.navigateByUrl('/main').then(()=>{
          location.reload();
        })
    })
  }

}
