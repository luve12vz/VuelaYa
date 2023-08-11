import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Global } from '../../services/global';
import { OnInit, ViewChild } from '@angular/core';
import { Ruta } from 'src/app/models/ruta';
import { VueloService } from 'src/app/services/vuelo.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  providers:[VueloService]
})
export class BusquedaComponent implements OnInit {
  public ruta:Ruta;

  constructor(
    private _vueloservice: VueloService
  ) { 
    this.ruta = new Ruta("","","","","");
  }

  ngOnInit(): void {
    
  }

}
