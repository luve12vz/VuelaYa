import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaS } from 'src/app/models/rutaS';
import { Vuelo } from 'src/app/models/vuelo';
import { Global } from 'src/app/services/global';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-resumendevueloidavuelta',
  templateUrl: './resumendevueloidavuelta.component.html',
  styleUrls: ['./resumendevueloidavuelta.component.css']
})
export class ResumendevueloidavueltaComponent implements OnInit{
  public vueloI: Vuelo;
  public vueloR: Vuelo;
  public url: String;
  public pasajeros:any;
  public rutasI: RutaS;
  public rutasR: RutaS;
  public params: any;
  public idVI: any;
  public idVR: any;
  public esIV: any;
  public dataPasajeros: any;
  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute)
  {
    this.url=Global.url;
    // this.vuelo = new Vuelo("","",0,0,0,0,"");
    //OJO con el constructor
    this.vueloI = new Vuelo("","",0,0,0,0,0,"");
    this.vueloR = new Vuelo("","",0,0,0,0,0,"");
    this.rutasI = new RutaS("","","","");
    this.rutasR = new RutaS("","","","");
  }
  
  ngOnInit(): void {
    this._route.queryParams.subscribe(
      params => {
        this.params = params;
        this.idVI = this.params.idVI;
        this.idVR = this.params.idVR;
        this.esIV = this.params.IV;
        this.pasajeros = this.params.p;
        this.dataPasajeros = this.params.d;
        this.getVueloById(this.idVI);
        this.getVueloById2(this.idVR);
      }
    )
  }

  getVueloById(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vueloI = response.vuelo;
          console.log('vuelo ida', this.vueloI);
          this.getRuta(this.vueloI.ruta);
        }
      }
    )
  }

  getRuta(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutasI = response.ruta;
          console.log('ruta ida', this.rutasI);
        }
      }
    )
  }

  getVueloById2(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vueloR = response.vuelo;
          console.log('vuelo regreso', this.vueloR);
          this.getRuta2(this.vueloR.ruta);
        }
      }
    )
  }

  getRuta2(id:String){
    this.vueloService.getRutaId(id).subscribe(
      response=>{
        if(response.ruta){
          this.rutasR = response.ruta;
          console.log('ruta regreso', this.rutasR);
        }
      }
    )
  }
}
