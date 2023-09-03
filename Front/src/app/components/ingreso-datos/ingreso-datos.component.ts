import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-datos',
  templateUrl: './ingreso-datos.component.html',
  styleUrls: ['./ingreso-datos.component.css']
})

export class IngresoDatosComponent implements OnInit{
  public params: any;
  public esIV: any;
  public pasajeros: any;
  public pasajerosS: any;
  public idVI: any;
  public isButtonVisible: boolean = true;
  public isButtonVisible2: boolean = true;
  public rutaI: any;
  public idVR: any;
  public mostrarFechaNacimiento: boolean = false;
  constructor(
    private _route: ActivatedRoute)
  {
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe(
      params=>{
        this.params = params;
        this.esIV = this.params.IV;
        // Esto solo se pasa como un string -> no array
        this.pasajeros = this.params.p;
        this.pasajerosS = this.params.p;
        // Transformar un JSON String a un array:
        this.pasajeros = JSON.parse(this.params.p);
        
        if(this.esIV == "I"){
          this.isButtonVisible = false;
          this.idVI = this.params.idVI;
        }
        else{
          this.isButtonVisible2 = false;
          this.idVI = this.params.idVI;
          this.idVR = this.params.idVR;
        }
      }
    )
  }
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  
  get esMenor(): boolean {
   
    return this.pasajeros[0]>1; // Cambia esto según tu lógica
  }

  get esMayorDe65(): boolean {
    // Lógica para determinar si es mayor de 65 años
    // Puedes usar la fecha de nacimiento para calcularlo
    return this.pasajeros[2]>1; // Cambia esto según tu lógica
  }
}





