import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { VueloService } from 'src/app/services/vuelo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vuelo } from 'src/app/models/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{

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

  total = 0;

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
    this.vueloI = new Vuelo("","",0,0,0,0,0,"");
    this.vueloR = new Vuelo("","",0,0,0,0,0,"");
  }

  ngOnInit(): void {
    this.initConfig('100');
    this._route.queryParams.subscribe(
      params=>{
        this.params = params;
        this.esIV = this.params.IV;
        // Esto solo se pasa como un string -> no array
        this.pasajeros = this.params.p;
        this.em = this.params.em;
        this.e23 = this.params.e23;
        // Transformar un JSON String a un array:
        // this.pasajeros = JSON.parse(this.params.p);
        if(this.esIV == "I"){
          this.idVI = this.params.idVI;
          this.asientosI = this.params.aI;
          this.getVueloByIdI(this.idVI);
          // Transformar un JSON String a un array:
          // this.asientosI = JSON.parse(this.asientosI);
        }
        else{
          this.idVI = this.params.idVI;
          this.idVR = this.params.idVR;
          this.asientosI = this.params.aI;
          this.asientosR = this.params.aR;
          this.getVueloByIdI(this.idVI);
          this.getVueloByIdR(this.idVR);
        }
      }
    )
  }

  getVueloByIdI(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vueloI = response.vuelo;
        }
      }
    )
  }

  getVueloByIdR(id:String){
    this.vueloService.getVueloId(id).subscribe(
      response=>{
        if(response.vuelo){
          this.vueloR = response.vuelo;
        }
      }
    )
  }

 /* updateTotal() {
    this.cart.forEach((cartItem) => {
      this.items.push({
        name: cartItem.name,
        quantity: cartItem.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: cartItem.price,
        },
      });
      this.total += parseFloat(cartItem.price) * cartItem.quantity;
    });
    this.initConfig(this.total + '');
  }*/

  private initConfig(price: string): void {
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
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: price,
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
        this._vueloservice.postEmail(customerInfo).subscribe(
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
      cedula: this.customerCedula
    };
  }

  private resetStatus(): void {
    this.total = 0;
    this.showError = false;
    this.showSuccess = false;
  }
}