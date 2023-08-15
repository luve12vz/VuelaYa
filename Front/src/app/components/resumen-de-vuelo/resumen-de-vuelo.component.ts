import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo';
import { Global } from 'src/app/services/global';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-resumen-de-vuelo',
  templateUrl: './resumen-de-vuelo.component.html',
  styleUrls: ['./resumen-de-vuelo.component.css']
})
export class ResumenDeVueloComponent implements OnInit{
  public vuelo: Vuelo;
  public url: String;

  constructor(
    private vueloService: VueloService,
    private _route: ActivatedRoute)
  {
    this.url=Global.url;
    // this.vuelo = new Vuelo("","",0,0,0,0,"");
    //OJO con el constructor
    this.vuelo = new Vuelo("","",0,0,0,0,0,"");
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        let id = params['id'];
        console.log(id);
        this.getVueloById(id);
      }
    )
  }

  getVueloById(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vuelo = response.vuelo;
        }
      }
    )
  }
}
