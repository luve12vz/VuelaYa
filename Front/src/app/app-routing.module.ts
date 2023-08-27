import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ResumenDeVueloComponent } from './components/resumen-de-vuelo/resumen-de-vuelo.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { BeneficiosComponent } from './components/beneficios/beneficios.component';
import { RedComponent } from './components/red/red.component';
import { ResumenCompraComponent } from './components/resumen-compra/resumen-compra.component';
import { SeleccionAsientosIdaComponent } from './components/seleccion-asientos-ida/seleccion-asientos-ida.component';
import { SeleccionAsientosRegresoComponent } from './components/seleccion-asientos-regreso/seleccion-asientos-regreso.component';
import { ResumendevueloidavueltaComponent } from './components/resumendevueloidavuelta/resumendevueloidavuelta.component';
import { ResumenCompraIdaVueltaComponent } from './components/resumen-compra-ida-vuelta/resumen-compra-ida-vuelta.component';
import { EquipajeExtraComponent } from './components/equipaje-extra/equipaje-extra.component';
import { IngresoDatosComponent } from './components/ingreso-datos/ingreso-datos.component';
import { ListadoRegresoComponent } from './components/listado-regreso/listado-regreso.component';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'lista-vuelos/:c/:idV/:p/:f', component: ListadoComponent },
  { path: 'resumen/:id/:p', component: ResumenDeVueloComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'beneficios', component: BeneficiosComponent },
  { path: 'red', component: RedComponent },
  { path: 'seleccion_asientos_ida', component: SeleccionAsientosIdaComponent },
  { path: 'seleccion_asientos_regreso', component: SeleccionAsientosRegresoComponent },
  { path: 'compra/:id/:p', component: ResumenCompraComponent },
  { path: 'resumendevueloidavuelta/:idV/:idR/:p', component: ResumendevueloidavueltaComponent },
  { path: 'resumen-compra-ida-vuelta/:idV/:idR/:p', component: ResumenCompraIdaVueltaComponent },
  { path: 'equipaje-extra', component: EquipajeExtraComponent },
  { path: 'ingreso-datos', component: IngresoDatosComponent },
  { path: 'listado-regreso/:idV/:idR/:p', component: ListadoRegresoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
