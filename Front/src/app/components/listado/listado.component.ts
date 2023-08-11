import { Component, OnInit } from '@angular/core';
import { Ruta } from 'src/app/models/ruta';
import { Vuelo } from 'src/app/models/vuelo';
import { VueloService } from 'src/app/services/vuelo.service'; // Asegúrate de importar correctamente tu servicio

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [VueloService]
})
export class ListadoComponent implements OnInit {
  vuelos: Vuelo[]; // Aquí almacenaremos los datos de los vuelos
  ruta: Ruta;
  constructor(private vueloService: VueloService)
  { 
    this.ruta = new Ruta("","","","","");
    this.vuelos = [];
  }

  ngOnInit(): void {
    this.obtenerVuelos();
  }

  obtenerVuelos() {
    this.ruta.origen = 'Quito'; // Define los valores adecuados para origen, destino, fechaSalida y fechaRetorno
    this.ruta.destino = 'Cuenca';
    this.ruta.fechaSalida = '2023-08-15';
    this.ruta.fechaRetorno = '2023-09-13';


    this.vueloService.getVueloBusqueda(this.ruta)
      .subscribe(
        (data) => {
          this.vuelos = data; // Asignamos los datos recibidos al arreglo de vuelos
        },
        (error) => {
          console.error('Error al obtener los vuelos:', error);
        }
      );
  }

  seleccionarVuelo(vuelo: any) {
    // Aquí puedes realizar acciones al seleccionar un vuelo, por ejemplo, redirigir a otra página o mostrar detalles.
    console.log('Vuelo seleccionado:', vuelo);
  }
}
