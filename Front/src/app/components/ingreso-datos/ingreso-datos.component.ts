import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasajero } from 'src/app/models/pasajeros';

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
  public pasajerosInfo: Pasajero[] = [];
  public pasajerosInfoS: string = "";
  public pasajeroActual = new Pasajero("", "", "");
  public sumaPasajeros: number = 0;
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';

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
        this.sumaPasajeros = JSON.parse(this.pasajeros).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
        if (this.pasajeros[0] > 0 || this.pasajeros[3] > 0 || this.pasajeros[2] > 0) {
          this.mostrarFechaNacimiento = true;
        } else {
          this.mostrarFechaNacimiento = false;
        }
      }
    )
    for (let i = 0; i < this.sumaPasajeros; i++) {
      this.pasajerosInfo.push(new Pasajero('', '', ''));
    }
  }

  todosLosDatosNoVacios(pasajerosInfo: Pasajero[]): boolean {
    for (const pasajero of pasajerosInfo) {
      if (!pasajero.nombre || !pasajero.apellido || !pasajero.fechaNacimiento) {
        return false;
      }
    }
    this.pasajerosInfoS = JSON.stringify(this.pasajerosInfo);
    return true;
  }

  guardarPasajero() {
    // Copiar los datos del pasajero actual al arreglo
    console.log(this.pasajerosInfo)
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }
}





