import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen-compra-ida-vuelta',
  templateUrl: './resumen-compra-ida-vuelta.component.html',
  styleUrls: ['./resumen-compra-ida-vuelta.component.css']
})
export class ResumenCompraIdaVueltaComponent implements OnInit{
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    // this.route.queryParams.subscribe(
    //   params => {
    //     this.params = params;
    //     this.pasajeros = this.params.p;
    //     this.esIV = this.params.IV;
    //     if (this.esIV == "I") {
    //       this.isButtonVisible = false;
    //       this.idVI = this.params.idV;
    //     }
    //     else {
    //       this.isButtonVisible2 = false;
    //       this.idVI = this.params.idVI;
    //       this.idVR = this.params.idVR;
    //     }

    //   }
    // )
  }

}
