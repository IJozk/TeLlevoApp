import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  go() {
    if(this.form.value.email?.indexOf('conductor')!=-1){
      this.router.navigate([`/conductor`]);
      console.log(this.form.value.email);
      console.log(this.form.value.email?.indexOf('conductor'));
    }
    else{
      this.router.navigate([`/pasajero`]);
    }
  }

  ngOnInit() {}


}
