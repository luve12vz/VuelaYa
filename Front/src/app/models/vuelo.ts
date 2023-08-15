export class Vuelo{
    constructor(
        public _id:string,
        public numeroVuelo:string,
        public duracion:number,
        public precio:number,
        public horaLlegada:number,
        public horaSalida:number,
        public pasajerosReserva:number,
        public idRuta:string
    ){}
}
