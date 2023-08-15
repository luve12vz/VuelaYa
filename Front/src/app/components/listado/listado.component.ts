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
  public url:string;
  public pasajeros:any;

  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute    )
  {
    this.url=Global.url;
    this.rutas = new RutaS("","","","");
    this.vuelos = [];
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params=>{
        console.log(params);
        let id:any = params.get('id');
        this.pasajeros = params.get('p');
        this.getVuelosByIdRuta(id);
        this.getRuta(id);
      }
    )
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
      }
    )
  }
}
