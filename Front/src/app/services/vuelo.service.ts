import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from 'rxjs';
import { Ruta } from "../models/ruta";
@Injectable()
export class VueloService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //ver todos los vuelos
    //http://localhost:3600/vuelos
    getVuelos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'vuelos',{headers:headers});
    }
    //ver vuelos por busqueda especifica
    //http://localhost:3600/buscar-vuelos?origen=Quito&destino=Guayaquil&fechaSalida=2023-08-19&fechaRetorno=2023-09-13
    getVueloBusqueda(ruta:Ruta):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'buscar-vuelos?origen='+ruta.origen+'&destino='+ruta.destino+'&fechaSalida='+ruta.fechaSalida
        +'&fechaRetorno='+ruta.fechaRetorno,{headers:headers});
    }

} 