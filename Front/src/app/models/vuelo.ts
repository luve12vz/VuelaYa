export class Vuelo{
    constructor(
        public _id:string,
        public numeroVuelo:string,
        public duration:number,
        public precio:number,
        public horaLlegada:number,
        public horaSalida:number,
        public idRuta:string
    ){}
}