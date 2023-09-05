import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { VueloService } from 'src/app/services/vuelo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  public customerName = '';
  public customerEmail = '';
  public customerAddress = '';
  public customerCedula = '';
  public selectedPaymentMethod = '';
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public params: any;
  public pago = 0; 
  public total = 0;
  public totalida = 0;
  public totalregreso = 0;
  public asientosTotales: any[] = [];
  public valormaletas = 0;
  public descuento = 0;
  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;
  esIV: any;
  pasajeros: any;
  idVI: any;
  idVR: any;
  em: any;
  e23: any;
  asientosI: any;
  asientosR: any;
  vueloI: any;
  vueloR: any;
  constructor(
    private _route: ActivatedRoute,
    private vueloService: VueloService) {
    this.vueloI = new Vuelo("", "", 0, 0, 0, 0, 0, "");
    this.vueloR = new Vuelo("", "", 0, 0, 0, 0, 0, "");
  }


  getVueloByIdI(id: String) {
    this.vueloService.getVueloId(id).subscribe(
      response => {
        if (response.vuelo) {
          this.vueloI = response.vuelo;
        }
      }
    )
  }

  getVueloByIdR(id: String) {
    this.vueloService.getVueloId(id).subscribe(
      response => {
        if (response.vuelo) {
          this.vueloR = response.vuelo;
        }
      }
    )
  }
  //muestra en un array la cantidad total de los asientos 
  calcularAsientosTotales() {
    let asientosTotales: any[] = [...this.asientosI];

    // Si es un vuelo de ida y vuelta, combina los asientos de ida y vuelta en un solo arreglo
    if (this.esIV === "R") {
      asientosTotales = [...asientosTotales, ...this.asientosR];
    }

    // Filtra los asientos ocupados (eliminando espacios vacíos y comas duplicadas)
    asientosTotales = asientosTotales.filter(asiento => asiento.trim() !== '');

    // Limpia los valores de los asientos utilizando una expresión regular
    asientosTotales = asientosTotales.map(asiento => asiento.replace(/,/g, ''));

    // Une los asientos en una cadena separada por comas
    const asientosOcupados = ',' + asientosTotales.join(',') + ',';

    return asientosOcupados;
  }
  caluloMaletas() {
    const e23 = parseInt(this.e23);
    const em = parseInt(this.em);
    return this.valormaletas = (e23 + em) * 65;
  }
  CalculoPagoAsientos() {
    this.pasajeros = JSON.parse(this.params.p);
    const pasajerosNumero = parseInt(this.pasajeros[0]);
    const pasajerosNumero1 = parseInt(this.pasajeros[1]);
    const pasajerosNumero2 = parseInt(this.pasajeros[2]);
    const pasajerosNumero3 = parseInt(this.pasajeros[3]);

    var totalpasajeros = this.pasajeros[0] + this.pasajeros[1] + this.pasajeros[2] + this.pasajeros[3];

    this.totalida = this.vueloI.precio * (totalpasajeros);
    this.totalregreso = this.vueloR.precio * (totalpasajeros);
    return this.totalregreso + this.totalida;
  }
  calculoValoraddI(){
    if (this.esIV === "I") {
      this.idVI = this.params.idVI;
      this.asientosI = JSON.parse(this.params.aI); // Convierte a un arreglo
    } else {
      this.idVI = this.params.idVI;
      this.idVR = this.params.idVR;
      this.asientosI = JSON.parse(this.params.aI); // Convierte a un arreglo
      this.asientosR = JSON.parse(this.params.aR); // Convierte a un arreglo
    }
    
    return this.asientosI
  }
  calculoValoraddR(){
    if (this.esIV === "I") {
      this.idVI = this.params.idVI;
      this.asientosI = JSON.parse(this.params.aI); // Convierte a un arreglo
    } else {
      this.idVI = this.params.idVI;
      this.idVR = this.params.idVR;
      this.asientosI = JSON.parse(this.params.aI); // Convierte a un arreglo
      this.asientosR = JSON.parse(this.params.aR); // Convierte a un arreglo
    }
    
    return this.asientosR
  }
  calculoDescuento() {
    this.pasajeros = JSON.parse(this.params.p);
    const pasajerosNumero = parseInt(this.pasajeros[0]);
    const pasajerosNumero3 = parseInt(this.pasajeros[3]);
    if (pasajerosNumero > 0) {
      this.descuento = this.descuento + ((this.vueloI.precio + this.vueloR.precio) / 2);
    } if (pasajerosNumero3 > 0) {
      this.descuento = this.descuento + this.vueloI.precio + this.vueloR.precio;
    } else {
      this.descuento = 0;
    }
    return this.descuento
  }
  totalpago() {
   
    this.total = this.CalculoPagoAsientos() + this.caluloMaletas() - this.calculoDescuento();
    console.log("Total a pagar no se que pasa:", this.total);
    return this.CalculoPagoAsientos() + this.caluloMaletas() - this.calculoDescuento();
  }
  

  ngOnInit(): void {
   
   // this.initConfig(this.totalpago().toString());

    // this.totalpago();
     //this.initConfig('305');
    
   
    this._route.queryParams.subscribe(
      params => {
        console.log("Total a pagar no se que pasa 1:", this.total);
        this.params = params;
        this.esIV = this.params.IV;
        // Esto solo se pasa como un string -> no array
        this.pasajeros = this.params.p;
        this.em = this.params.em;
        this.e23 = this.params.e23;
        // Transformar un JSON String a un array:
        // this.pasajeros = JSON.parse(this.params.p);
        if (this.esIV == "I") {
          this.idVI = this.params.idVI;
          this.asientosI = this.params.aI;
          this.getVueloByIdI(this.idVI);
          // Transformar un JSON String a un array:
          // this.asientosI = JSON.parse(this.asientosI);
        }
        else {
          this.idVI = this.params.idVI;
          this.idVR = this.params.idVR;
          this.asientosI = this.params.aI;
          this.asientosR = this.params.aR;
          this.getVueloByIdI(this.idVI);
          this.getVueloByIdR(this.idVR);
        }
        this.total = this.totalpago();
        console.log("Total a pagar no se que pasa:", this.total.toString());
        this.initConfig();
      }
      
      
    )
    //this.initConfig('100');
   
  }
  private initConfig(): void {
    console.log("Total a pagar no se que pasa:", this.total);
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AYs09Ms70cAT8PoLF4QTxWn9UZPN2rYiJfcpbHQhUjoPy_sD2HWLaOFJoxYD7UYZyDg9Z_HcweSlbaR3',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.total.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.total.toString(),
                  },
                },
              }
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        shape: 'pill',
        color: 'blue',
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (
        data: any,
        actions: { order: { get: () => Promise<any> } }
      ) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        const customerInfo = this.getCustomerInfo();
        console.log('Información del cliente que se enviará:', customerInfo);
        this.vueloService.postEmail(customerInfo).subscribe(
          (response) => {
            console.log('Correo enviado:', response);
          },
          (error) => {
            console.log('Error:', error);
          }
        );
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err: any) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data: any, actions: any) => {
        console.log('onInit', data, actions);
      },
    };
  }
  private getCustomerInfo() {
    
    return {
      name: this.customerName,
      email: this.customerEmail,
      address: this.customerAddress,
      cedula: this.customerCedula,
      boletos: this.CalculoPagoAsientos(),
      total: this.totalpago(),
      impuestos: this.caluloMaletas(),
      ida:  this.calculoValoraddI(),
      regreso: this.calculoValoraddR()

    };
  }

  private resetStatus(): void {
    
    this.total = 0;
    this.showError = false;
    this.showSuccess = false;
  }
}