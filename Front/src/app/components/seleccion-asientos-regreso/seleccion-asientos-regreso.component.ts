import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion-asientos-regreso',
  templateUrl: './seleccion-asientos-regreso.component.html',
  styleUrls: ['./seleccion-asientos-regreso.component.css']
})
export class SeleccionAsientosRegresoComponent implements OnInit {
  constructor() {}
  
  ngOnInit() {}
  
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}