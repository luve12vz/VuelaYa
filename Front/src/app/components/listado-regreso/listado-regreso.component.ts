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
  public url:string;
  public pasajeros: any;
  vueloI: Vuelo;
  vuelosR: Vuelo[];
  public rutasI: RutaS;
  public rutasR: RutaS;
  public params: any;
  public esIV: any;
  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute)
  {
    this.url=Global.url;
    this.rutasI = new RutaS("","","","");
    this.rutasR = new RutaS("","","","");
    this.vueloI = new Vuelo("","",0,0,0,0,0,"");
    this.vuelosR = [];
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe(
      params=>{
        this.params = params;
        this.esIV = this.params.IV;
        this.pasajeros = this.params.p;
        this.getRutaR(this.params.rutaR);
        this.getRutaI(this.params.rutaI);
        this.getVuelosByIdRuta(this.params.rutaR);
        this.getVueloById(this.params.idV);
      }
    )
  }

  getVuelosByIdRuta(id:String){
    this.vueloService.getVueloByRuta(id).subscribe(
      response=>{
        if(response.listaVuelos){
          this.vuelosR = response.listaVuelos
          console.log('Lista de vuelos de Regreso:', this.vuelosR)
        }
      }
    )
  }

  getRutaR(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutasR = response.ruta;
          console.log('Ruta de Regreso:',this.rutasR);
        }
      },error => {
        console.log("No hay vuelos");
        alert("No hay vuelos disponibles para esa fecha");
      }
    )
  }

  getRutaI(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutasI = response.ruta;
          console.log('Ruta de Ida:',this.rutasI);
        }
      },error => {
        console.log("No hay vuelos");
        alert("No hay vuelos disponibles para esa fecha");
      }
    )
  }

  getVueloById(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vueloI = response.vuelo;
          console.log('Vuelo de Ida seleccionado anteriormente:', this.vueloI);
        }
      }
    )
  }
}
