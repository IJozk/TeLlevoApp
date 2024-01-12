import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
    confirmPass: new FormControl('', [Validators.required])
    },
    {
      validators : this.confirmarPass('password','confirmPass')
    });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


    // Función de validación para confirmacion de password
  confirmarPass(campo1: string, campo2: string): ValidatorFn {
      return (formulario: FormGroup): ValidationErrors | null => {
        const control1 = formulario.get(campo1);
        const control2 = formulario.get(campo2);
    
        if (control1 && control2 && control1.value !== control2.value) {
          // La validación falla, devolver un objeto con un error
          return { coincidirCampos: true };
        }
    
        // La validación pasa, devolver null
        return null;
      };
    }


    ngOnInit() {
    }


  isLike(source: string, pattern: string): boolean {
    const regex = new RegExp(pattern.replace(/%/g, '.*'), 'i');
    return regex.test(source);
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.nombre);
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
        

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

  async setUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;
      delete this.form.value.confirmPass;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilsSvc.saveInLocalStorage('user', this.form.value);
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