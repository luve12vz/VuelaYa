import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  {path:'home',component:InicioComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'lista-vuelos/:id',component:ListadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
