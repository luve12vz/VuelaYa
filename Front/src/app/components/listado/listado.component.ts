import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaS } from 'src/app/models/rutaS';
import { Vuelo } from 'src/app/models/vuelo';
import { Global } from 'src/app/services/global';
import { VueloService } from 'src/app/services/vuelo.service'; // Asegúrate de importar correctamente tu servicio

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  vuelos: Vuelo[]; // Aquí almacenaremos los datos de los vuelos
  rutas: RutaS;
  public rutaRR = new RutaS("","","","");
  public isButtonVisible = true;
  public isButtonVisible2 = true;
  public url:string;
  public pasajeros:any;
  public esIV: any;
  public rutaRegresoOrigen: string = "";
  public rutaRegresoDestino: string = "";
  public rutaRegresoFecha: any;
  public routerRegreso: any;
  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute)
  {
    this.url=Global.url;
    this.rutas = new RutaS("","","","");
    this.vuelos = [];
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params=>{
        console.log(params);
        let id:any = params.get('idV');
        this.esIV = params.get('c');
        this.pasajeros = params.get('p');
        this.rutaRegresoFecha = params.get('f');
        this.redireccionamiento(this.esIV);
        this.getRuta(id);
        this.getVuelosByIdRuta(id);
      }
    )
  }

  redireccionamiento(dato:string){
    if(dato === "I"){
      this.isButtonVisible = false;
    }
    else{
      this.isButtonVisible2 = false;
    }
  }

  getVuelosByIdRuta(id:String){
    this.vueloService.getVueloByRuta(id).subscribe(
      response=>{
        if(response.listaVuelos){
          this.vuelos = response.listaVuelos
          console.log(this.vuelos)
        }
      }
    )
  }

  getRuta(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutas = response.ruta;
        }
      },error => {
        console.log("No hay vuelos");
        alert("No hay vuelos disponibles para esa fecha");
      },
      () => { // Se envia a la pagina correspondiente
        if(this.esIV === "IV"){
          this.rutaRegresoOrigen = this.rutas.destino;
          this.rutaRegresoDestino = this.rutas.origen;
          this.getVueloRuta();
        }
      }
    )
  }

  getVueloRuta() {
    let rutaR = new RutaS("", this.rutaRegresoOrigen, this.rutaRegresoDestino, this.rutaRegresoFecha);
    this.vueloService.getVueloBusquedaS(rutaR).subscribe(
      response => {
        if (response.rutasEncontradas) {
          this.rutaRR = response.rutasEncontradas;
          console.log(this.rutaRR);
        }
      },
      error => {
          console.log("No hay vuelos");
          alert("No hay vuelos disponibles para esa fecha");
      }
    )
  }
}
