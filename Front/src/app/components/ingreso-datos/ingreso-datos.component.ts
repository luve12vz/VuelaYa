import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingreso-datos',
  templateUrl: './ingreso-datos.component.html',
  styleUrls: ['./ingreso-datos.component.css']
})

export class IngresoDatosComponent {
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  
  get esMenor(): boolean {
    // Lógica para determinar si es menor de edad (menor de 18 años)
    // Puedes usar la fecha de nacimiento para calcularlo
    return false; // Cambia esto según tu lógica
  }

  get esMayorDe65(): boolean {
    // Lógica para determinar si es mayor de 65 años
    // Puedes usar la fecha de nacimiento para calcularlo
    return false; // Cambia esto según tu lógica
  }
}





