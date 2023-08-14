import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ResumenDeVueloComponent } from './components/resumen-de-vuelo/resumen-de-vuelo.component';

const routes: Routes = [
  {path:'home', component:InicioComponent},
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'lista-vuelos/:id', component:ListadoComponent},
  {path:'resumen/:id', component:ResumenDeVueloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
