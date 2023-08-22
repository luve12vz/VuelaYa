
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { BeneficiosComponent } from './components/beneficios/beneficios.component';
import { RedComponent } from './components/red/red.component';
import { ListadoComponent } from './components/listado/listado.component';
import { ResumenDeVueloComponent } from './components/resumen-de-vuelo/resumen-de-vuelo.component';
import { NoticiasIiComponent } from './components/noticias-ii/noticias-ii.component';
import { JsonPipe } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { VueloService } from './services/vuelo.service';
import { ResumenCompraComponent } from './components/resumen-compra/resumen-compra.component';
import { SeleccionAsientosIdaComponent } from './components/seleccion-asientos-ida/seleccion-asientos-ida.component';
import { SeleccionAsientosRegresoComponent } from './components/seleccion-asientos-regreso/seleccion-asientos-regreso.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    BusquedaComponent,
    NosotrosComponent,
    BeneficiosComponent,
    RedComponent,
    ListadoComponent,
    ResumenDeVueloComponent,
    NoticiasIiComponent,
    ResumenCompraComponent,
    SeleccionAsientosIdaComponent,
    SeleccionAsientosRegresoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbDatepickerModule, 
    NgbAlertModule, 
    FormsModule, 
    JsonPipe
  ],
  providers: [VueloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
