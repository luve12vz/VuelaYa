import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ResumenDeVueloComponent } from './components/resumen-de-vuelo/resumen-de-vuelo.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { BeneficiosComponent } from './components/beneficios/beneficios.component';
import { RedComponent } from './components/red/red.component';
import { ResumenCompraComponent } from './components/resumen-compra/resumen-compra.component';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'lista-vuelos/:id/:p', component: ListadoComponent },
  { path: 'resumen/:id/:p', component: ResumenDeVueloComponent }, 
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'beneficios', component: BeneficiosComponent},
  { path: 'red', component: RedComponent},
  { path: 'compra/:id/:p', component:ResumenCompraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
