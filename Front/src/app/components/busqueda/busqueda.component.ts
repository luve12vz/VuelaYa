import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/models/aeropuerto';
import { RutaS } from 'src/app/models/rutaS';
import { ActivatedRoute, Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  providers: [VueloService]
})
export class BusquedaComponent implements OnInit {
  public rutaS: RutaS;
  public aeropuertos: Aeropuerto[];
  public isDisabled: boolean = true;
  public isDisabledOption: boolean = true;
  public valorUbicacion: any = undefined;
 /* public vuelo:Vuelo;
  constructor(
    private 
  )*/
  constructor(
    private _vueloservice: VueloService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.rutaS = new RutaS("", "", "", "");
    this.aeropuertos = [];
  }

  ngOnInit(): void {
    //this.setupDatepicker();
    this.setupIncrementDecrement();
    this.validateOriginAndDestination();
    this.getAeropuertos();
  }
  ngAfterViewInit(): void {
    this.validateOriginAndDestination();
  }
/*   setupDatepicker() {
    const today = new Date();
    $("#datepicker").datepicker({
      dateFormat: "dd-mm-yy",
      changeMonth: true,
      changeYear: true,
      yearRange: "2023:2024",
      minDate: today,
    });
  } */
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

getAeropuertos(){
  this._vueloservice.getAeropuertos().subscribe(
    response=> {
      if (response.aeropuertos) {
        this.aeropuertos = response.aeropuertos
        console.log(this.aeropuertos)
      }
    }
  )
}

checkDestino(vueloDestinoValue){
  this.valorUbicacion = vueloDestinoValue;
  console.log(vueloDestinoValue);
  this.isDisabled = false;
}

getVueloRuta(){
  this.rutaS.fechaSalida = this.rutaS.fechaSalida.year+"-"+('0'+this.rutaS.fechaSalida.month).slice(-2)
  +"-"+('0'+this.rutaS.fechaSalida.day).slice(-2)
  console.log(this.rutaS.fechaSalida);
  this._vueloservice.getVueloBusquedaS(this.rutaS).subscribe(
    response => {
      if (response.rutasEncontradas){
        this.rutaS = response.rutasEncontradas;
        console.log(this.rutaS);
      }
    },
    error => {
      console.log(error);
    },
    () => { // Se envia a la pagina correspondiente
      this._router.navigate(['/lista-vuelos', this.rutaS[0]._id])
    }
  )
}
}  
