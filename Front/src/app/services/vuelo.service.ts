import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from 'rxjs';
import { Ruta } from "../models/ruta";
import { RutaS } from "../models/rutaS";
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
    //ver vuelos por busqueda solo de ida
    //http://localhost:3600/buscar-vuelos?origen=Quito&destino=Guayaquil&fechaSalida=2023-08-19
    getVueloBusquedaS(rutaS:RutaS):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'buscar-vuelos?origen='+rutaS.origen+'&destino='+rutaS.destino+'&fechaSalida='+rutaS.fechaSalida,{headers:headers});
    }
    //ver vuelos por busqueda de ida y vuelta
    getVueloBusquedaSR(ruta:Ruta):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'buscar-vuelos?origen='+ruta.origen+'&destino='+ruta.destino+'&fechaSalida='+ruta.fechaSalida
        +'&fechaRetorno='+ruta.fechaRetorno,{headers:headers});
    }
    //Obtener los aeropuertos
    getAeropuertos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'aeropuertos',{headers:headers});
    }
    //Obtener los vuelos mediante el id de ruta
    getVueloByRuta(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'lista-vuelos/'+id,{headers:headers});
    }
    //Obtener ruta por su id
    getRutaId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'ruta/'+id,{headers:headers});
    }
    //Obtener ruta por su id
    getVueloId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'vuelo/'+id,{headers:headers});
    }
} 