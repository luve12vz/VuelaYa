import { Component, OnInit } from '@angular/core';
import { VueloService } from 'src/app/services/vuelo.service'; // Asegúrate de importar correctamente tu servicio

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  vuelos: any[] = []; // Aquí almacenaremos los datos de los vuelos

  constructor(private vueloService: VueloService) { }

  ngOnInit(): void {
    this.obtenerVuelos();
  }

  obtenerVuelos() {
    const origen = 'Quito'; // Define los valores adecuados para origen, destino, fechaSalida y fechaRetorno
    const destino = 'Cuenca';
    const fechaSalida = '2023-08-15';
    const fechaRetorno = '2023-09-13';


    this.vueloService.getVueloBusqueda(origen, destino, fechaSalida, fechaRetorno)
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
