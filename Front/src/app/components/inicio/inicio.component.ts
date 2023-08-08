import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[VueloService]
})
export class InicioComponent implements OnInit {
  public vuelo: Vuelo[];
  public url: string;
  constructor(
    private _vueloservice: VueloService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.url = Global.url;
    this.vuelo = [];
  }
  ngOnInit(): void {
    this.getVuelos();
  }
  getVuelos() {
    this._vueloservice.getVuelos().subscribe(
      response => {
        if (response.vuelos) {
          this.vuelo = response.vuelos
          console.log(this.vuelo)
        }
      }
    )
  }
}
