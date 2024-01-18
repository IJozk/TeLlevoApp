import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autoselect } from 'src/app/models/auto-select.model';
import { Auto } from 'src/app/models/auto.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ajustar-viaje',
  templateUrl: './ajustar-viaje.page.html',
  styleUrls: ['./ajustar-viaje.page.scss'],
})
export class AjustarViajePage implements OnInit {

  router = inject(Router);
  utilSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  autoSelect: Autoselect = this.utilSvc.getFromLocalStorage('auto-select');
  patente : string = this.autoSelect.patente;
  maxAsientos : number = +this.autoSelect.maxAsientos;
  date: Date = new Date();
  dateformat :string = ((this.date.getMonth() > 8) ? (this.date.getMonth() + 1) : ('0' + (this.date.getMonth() + 1))) + '/' + ((this.date.getDate() > 9) ? this.date.getDate() : ('0' + this.date.getDate())) + '/' + this.date.getFullYear();
  user: User = this.utilSvc.getFromLocalStorage('user');
  email: string = this.user.email;

  form = new FormGroup({
    asientos: new FormControl('', [Validators.required, Validators.max(this.maxAsientos)]),
    destino: new FormControl('', [Validators.required]),
    patente: new FormControl( { value : this.patente, disabled: true } , [Validators.required]),
    montoAsiento: new FormControl('', [Validators.required]),
    fecha: new FormControl(''),
    conductor: new FormControl(''),
    estado: new FormControl(''),
    hora: new FormControl('', [Validators.required]),
  })
  
  ngOnInit() {
    console.log(this.patente)
  }


  async submit() {

    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      let path = `viajes/${this.patente+this.date.toDateString()}`;

      this.form.value.conductor = this.email;
      this.form.value.patente = this.patente;
      this.form.value.fecha = this.dateformat;
      this.form.value.estado = 'creado';
      this.form.value.hora = this.form.value.hora.substring(11,16);

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        
        this.utilSvc.saveInLocalStorage('reserva', { "reserva": "false" });
        this.router.navigateByUrl('/main');
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
      }).finally(() => {
        loading.dismiss();
      })
    }

  }

}
