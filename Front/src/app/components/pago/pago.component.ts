import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
  public defaultPrice: string = '9.99';
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

  constructor() {}

  ngOnInit(): void {
    this.initConfig('100');
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

  private resetStatus(): void {
    this.total = 0;
    this.showError = false;
    this.showSuccess = false;
  }
}