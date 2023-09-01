import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion-asientos-ida',
  templateUrl: './seleccion-asientos-ida.component.html',
  styleUrls: ['./seleccion-asientos-ida.component.css']
})
export class SeleccionAsientosIdaComponent implements OnInit{
  constructor(){}
  ngOnInit(){}
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}

