import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-equipaje-extra',
  templateUrl: './equipaje-extra.component.html',
  styleUrls: ['./equipaje-extra.component.css']
})
export class EquipajeExtraComponent implements OnInit {
  public eventListenersAttached = false;
  public params: any;
  extraCountmano: number = 0;
  extraCount23kg: number = 0;
  maxMaletas: number = 3;
  public esIV: String = "";
  public isButtonVisible = true;
  public isButtonVisible2 = true;
  public pasajeros: any;
  public idVI: string = "";
  public idVR: string = "";
  public asientosI: string[] = [];
  public asientosR: string[] = [];
  public asientosIS: any;
  public asientosRS: any;
  public sumaPasajeros: number = 0;
  mostrarAsientosIda = true;
  mostrarAsientosRegreso = true;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.params = params;
        this.pasajeros = this.params.p;
        this.sumaPasajeros = JSON.parse(this.pasajeros).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(this.sumaPasajeros);
        this.esIV = this.params.IV;
        if (this.esIV == "I") {
          this.isButtonVisible = false;
          this.idVI = this.params.idVI;
        }
        else {
          this.isButtonVisible2 = false;
          this.idVI = this.params.idVI;
          this.idVR = this.params.idVR;
        }
      }
    )
  }

  toggleAsientosIda(): void {
    this.mostrarAsientosIda = !this.mostrarAsientosIda;
  }

  toggleAsientosRegreso(): void {
    this.mostrarAsientosRegreso = !this.mostrarAsientosRegreso;
  }

  onCheckboxesChangeI(checkboxes: string[]) {
    this.asientosI = checkboxes;
    this.asientosIS = JSON.stringify(this.asientosI);
    console.log('Datos recibidos del componente asientos ida:', this.asientosI);
  }

  onCheckboxesChangeR(checkboxes: string[]) {
    this.asientosR = checkboxes;
    this.asientosRS = JSON.stringify(this.asientosR);
    console.log('Datos recibidos del componente asientos regreso:', this.asientosR);
  }

  incrementExtraMano() {
    if (this.extraCountmano < this.maxMaletas) {
      this.extraCountmano++;
    }

  }
  decrementExtraMano() {
    if (this.extraCountmano > 0) {
      this.extraCountmano--;
    }
  }

  incrementExtra() {
    if (this.extraCount23kg < this.maxMaletas) {
      this.extraCount23kg++;
    }

  }
  decrementExtra() {
    if (this.extraCount23kg > 0) {
      this.extraCount23kg--;
    }
  }
}