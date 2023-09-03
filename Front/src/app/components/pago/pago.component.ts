import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { VueloService } from 'src/app/services/vuelo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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


  total = 0;

  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;

  constructor(private _vueloservice: VueloService) {
    
  }

  ngOnInit(): void {
    this.initConfig('100');
  }


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