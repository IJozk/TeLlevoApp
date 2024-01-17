import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Auto } from 'src/app/models/auto.model';
import { User } from 'src/app/models/user.model'
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-auto',
  templateUrl: './add-auto.page.html',
  styleUrls: ['./add-auto.page.scss'],
})
export class AddAutoPage implements OnInit {



  form = new FormGroup({
    conductor: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    patente: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2}[-]([a-zA-Z]{2}|[0-9]{2})[-][0-9]{2}')]),
    modelo: new FormControl('', [Validators.required]),
    maxAsientos: new FormControl('', [Validators.required, Validators.pattern('[1-9]{1}')]),
    tipo: new FormControl('', [Validators.required])
    });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  ngOnInit() {
  }

  async submit() {

    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let user: User = JSON.parse(localStorage.getItem('user'));
      let mail: string = user.email;

      this.form.value.conductor = mail;

      let path = `autos/${this.form.value.patente}`;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilsSvc.saveInLocalStorage('auto-select', this.form.value);
      this.utilsSvc.routerLink('/main');
      this.form.reset();

      }).catch(error => {
        console.log(error)

        this.utilsSvc.presentToast({
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
