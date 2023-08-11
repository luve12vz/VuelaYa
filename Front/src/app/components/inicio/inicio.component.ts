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
    this.getVueloRuta("Quito", "Cuenca", '2023-08-15', '2023-09-13');
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
  getVueloRuta(origen:string, destino:string, fechaS:any, fechaR:any){
    this._vueloservice.getVueloBusqueda(origen, destino, fechaS, fechaR).subscribe(
      response => {
        if (response.rutasEncontradas){
          this.vuelo = response.rutasEncontradas
          console.log(this.vuelo)
        }
      }
    )
  }
}
