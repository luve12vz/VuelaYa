'use strict'
var mongoose = require('mongoose');
var port = '3600';
mongoose.promise=global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');
mongoose.connect('mongodb+srv://veronicazuniga252:jIuEYe7mNgwfz4Rz@cluster0.gu0c8iq.mongodb.net/Aerolinea?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conexion establecida con la BDD");
    app.listen(port,()=>{
        console.log("Conexion establecida con la url");
    })
})
.catch(err=>console.log(err))