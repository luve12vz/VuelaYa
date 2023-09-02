import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/models/aeropuerto';
import { RutaS } from 'src/app/models/rutaS';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  public rutaS: RutaS;
  public aeropuertos: Aeropuerto[];
  public isDisabled: boolean = true;
  public isDisabledOption: boolean = true;
  public valorUbicacion: any = undefined;
  public today: NgbDateStruct;
  public maxDate: NgbDateStruct;
  public pasajeros: Number[];
  public forma: String = "I";
  public fechaVuelta: any;
  public VueltaDisabled: boolean = true;
  public mayores65: number = 0;
  public entre25y65: number = 1;
  public entre2y24: number = 0;
  public menores2: number = 0;
  /* public vuelo:Vuelo;
   constructor(
     private 
   )*/
  constructor(
    private _vueloservice: VueloService,
    private _router: Router,
    private calendar: NgbCalendar
  ) {
    this.rutaS = new RutaS("", "", "", "");
    this.aeropuertos = [];
    this.pasajeros = [];
    this.today = this.calendar.getToday();
    this.maxDate = { year: 2024, month: 12, day: 31 };
  }

  ngOnInit(): void {
    //this.setupDatepicker();
    //this.setupIncrementDecrement();
    this.validateOriginAndDestination();
    this.getAeropuertos();
  }
  ngAfterViewInit(): void {
    this.validateOriginAndDestination();
  }
  /*  setupDatepicker() {
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

  getAeropuertos() {
    this._vueloservice.getAeropuertos().subscribe(
      response => {
        if (response.aeropuertos) {
          this.aeropuertos = response.aeropuertos
          console.log(this.aeropuertos)
        }
      }
    )
  }

  checkDestino(vueloDestinoValue) {
    this.valorUbicacion = vueloDestinoValue;
    console.log(vueloDestinoValue);
    this.isDisabled = false;
  }

  checkRadio(){
    if(this.forma === "I"){
      this.VueltaDisabled = true;
      this.fechaVuelta = "";
      console.log(this.forma)
    }
    else if (this.forma === "IV"){
      this.VueltaDisabled = false;
      console.log(this.forma)
    }
  }

  getVueloRuta() {
    this.rutaS.fechaSalida = this.rutaS.fechaSalida.year + "-" + ('0' + this.rutaS.fechaSalida.month).slice(-2)
      + "-" + ('0' + this.rutaS.fechaSalida.day).slice(-2)
    if(this.fechaVuelta != undefined){
      this.fechaVuelta = this.fechaVuelta.year + "-" + ('0' + this.fechaVuelta.month).slice(-2)
      + "-" + ('0' + this.fechaVuelta.day).slice(-2)
    }
    
    this._vueloservice.getVueloBusquedaS(this.rutaS).subscribe(
      response => {
        if (response.rutasEncontradas) {
          this.rutaS = response.rutasEncontradas;
          console.log(this.rutaS);
        }
      },
      error => {
          console.log("No hay vuelos");
          alert("No hay vuelos disponibles para esa fecha");
      },
      () => { // Se envia a la pagina correspondiente
        if(this.forma === "I"){
          this.pasajeros = [this.mayores65, this.entre25y65, this.entre2y24, this.menores2];
          this._router.navigate(['/lista-vuelos', this.forma,this.rutaS[0]._id, JSON.stringify(this.pasajeros), ''])
        }else{
          this.pasajeros = [this.mayores65, this.entre25y65, this.entre2y24, this.menores2];
          this._router.navigate(['/lista-vuelos', this.forma,this.rutaS[0]._id, JSON.stringify(this.pasajeros), this.fechaVuelta])
        }
      }
    )
  }
}  
