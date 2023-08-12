import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Global } from '../../services/global';
import { OnInit, ViewChild } from '@angular/core';
import { Ruta } from 'src/app/models/ruta';
import{Vuelo} from 'src/app/models/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  providers: [VueloService]
})
export class BusquedaComponent implements OnInit {
  public ruta: Ruta;
 /* public vuelo:Vuelo;
  constructor(
    private 
  )*/
  constructor(
    private _vueloservice: VueloService
  ) {
    this.ruta = new Ruta("", "", "", "", "");
  }

  ngOnInit(): void {
    this.setupDatepicker();
    this.setupIncrementDecrement();
    this.validateOriginAndDestination();
  }
  ngAfterViewInit(): void {
    this.validateOriginAndDestination();
  }
  setupDatepicker() {
    const today = new Date();
    $("#datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      changeMonth: true,
      changeYear: true,
      yearRange: "2023:2024",
      minDate: today,
    });
  }
  setupIncrementDecrement(): void {
    const decrementBtn = document.getElementById("decrementBtn") as HTMLButtonElement;
    const incrementBtn = document.getElementById("incrementBtn") as HTMLButtonElement;
    const quantityInput = document.getElementById("quantityInput") as HTMLInputElement;

    decrementBtn.addEventListener("click", () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = (currentValue - 1).toString();
      }
    });

    incrementBtn.addEventListener("click", () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = (currentValue + 1).toString();
      }
    });   
}
validateOriginAndDestination(): void {
  const origenInput = document.getElementById("origen") as HTMLInputElement;
  const destinoInput = document.getElementById("destino") as HTMLInputElement;

  if (origenInput && destinoInput) {
    origenInput.addEventListener("input", () => {
      this.checkOriginAndDestination(origenInput, destinoInput);
    });

    destinoInput.addEventListener("input", () => {
      this.checkOriginAndDestination(origenInput, destinoInput);
    });
  }
}

checkOriginAndDestination(originInput: HTMLInputElement, destinationInput: HTMLInputElement): void {
  const origin = originInput.value;
  const destination = destinationInput.value;
  
  if (origin === destination) {
    window.alert("No se puede ingresar la misma cuidad de origen y destino");
    originInput.value = ""; // Limpiar el campo de origen
    destinationInput.value = ""; // Limpiar el campo de destino
    // Puedes mostrar un mensaje de error, agregar clases de estilo, etc.
  } else {
    // Puedes limpiar mensajes de error, estilos, etc.
  }
}
}  
