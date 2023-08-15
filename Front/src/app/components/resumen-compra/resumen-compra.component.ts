import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaS } from 'src/app/models/rutaS';
import { Vuelo } from 'src/app/models/vuelo';
import { Global } from 'src/app/services/global';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css']
})
export class ResumenCompraComponent implements OnInit{
  public vuelo: Vuelo;
  public url: String;
  public pasajeros:any;
  public rutas: RutaS;
  
  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute)
  {
    this.url=Global.url;
    // this.vuelo = new Vuelo("","",0,0,0,0,"");
    //OJO con el constructor
    this.vuelo = new Vuelo("","",0,0,0,0,0,"");
    this.rutas = new RutaS("","","","");
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe(
      params=>{
        let id:any = params.get('id');
        this.pasajeros = params.get('p');
        console.log(id);
        console.log('pasajeros:', this.pasajeros);
        this.getVueloById(id);
      }
    )
  }

  getVueloById(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vuelo = response.vuelo;
          console.log('vuelo', this.vuelo);
          this.getRuta(this.vuelo.ruta);
        }
      }
    )
  }

  getRuta(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutas = response.ruta;
          console.log('ruta', this.rutas);
        }
      }
    )
  }

}
