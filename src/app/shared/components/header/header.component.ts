import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;

  @Input() isBackBtn: string = 'true';

  @Input() ruta!: string;

  back(){
    this.router.navigate([`/`+this.ruta]);
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

}
