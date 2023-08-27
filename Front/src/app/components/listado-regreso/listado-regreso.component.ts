import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaS } from 'src/app/models/rutaS';
import { Vuelo } from 'src/app/models/vuelo';
import { Global } from 'src/app/services/global';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-listado-regreso',
  templateUrl: './listado-regreso.component.html',
  styleUrls: ['./listado-regreso.component.css']
})
export class ListadoRegresoComponent implements OnInit {
  public url: string;
  public pasajeros: any;
  vueloI: Vuelo;
  vuelosR: Vuelo[];
  public rutasI: RutaS;
  public rutasR: RutaS;
  public esIV: any;
  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute) {
    this.url = Global.url;
    this.rutasI = new RutaS("", "", "", "");
    this.rutasR = new RutaS("", "", "", "");
    this.vueloI = new Vuelo("", "", 0, 0, 0, 0, 0, "");
    this.vuelosR = [];
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params => {
        console.log(params);
        let idI: any = params.get('idI');
        let idR: any = params.get('idR');
        let idVu: any = params.get('idVu')
        this.pasajeros = params.get('p');
        this.esIV = params.get('c');
        this.getRutaR(idR);
        this.getRutaI(idI);
        this.getVuelosByIdRuta(idR);
        this.getVueloById(idVu);
      }
    )
  }

  getVuelosByIdRuta(id: String) {
    this.vueloService.getVueloByRuta(id).subscribe(
      response => {
        if (response.listaVuelos) {
          this.vuelosR = response.listaVuelos
          console.log('Lista de vuelos de Regreso:', this.vuelosR)
        }
      }
    )
  }

  getRutaR(id: String) {
    this.vueloService.getRutaId(id).subscribe(
      response => {
        if (response.ruta) {
          this.rutasR = response.ruta;
          console.log('Ruta de Regreso:', this.rutasR);
        }
      }, error => {
        console.log("No hay vuelos");
        alert("No hay vuelos disponibles para esa fecha");
      }/*,
      () => { // Se envia a la pagina correspondiente
        if (this.esIV === "IV") {
          this. = this.rutas.destino;
          this.rutaRegresoDestino = this.rutas.origen;
          this.getVueloRuta();
          this.getVuelosByIdRuta(this.rutaRR[0]._id);
        }
      }*/
    )
  }

  getRutaI(id: String) {
    this.vueloService.getRutaId(id).subscribe(
      response => {
        if (response.ruta) {
          this.rutasI = response.ruta;
          console.log('Ruta de Ida:', this.rutasI);
        }
      }, error => {
        console.log("No hay vuelos");
        alert("No hay vuelos disponibles para esa fecha");
      }
    )
  }

  getVueloById(id: String) {
    this.vueloService.getVueloId(id).subscribe(
      response => {
        if (response.vuelo) {
          this.vueloI = response.vuelo;
          console.log('Vuelo de Ida seleccionado anteriormente:', this.vueloI);
        }
      }
    )
  }
}
