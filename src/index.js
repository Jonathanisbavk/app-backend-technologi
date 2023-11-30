//Lamada a los paquetes
const express = require("express")
const mongoose = require("mongoose")
const empleados = require("./routes/empleados")
const pagos = require("./routes/pagos-facturas")
const usuarios = require("./routes/usuarios")
const consulta = require ("./routes/informacion-consultoria")
require("dotenv").config()

//Configuraciones
const aplicacion = express();
const puerto = 3000;

// Middleware(Sistema de software para intercambio de info) para analizar el cuerpo de la solicitud
aplicacion.use(express.json());

//rutas
aplicacion.get(
    "/prueba", (req, res) => {res.send ("Pagina de prueba")}
)
aplicacion.get (
    "/", (req, res) => {res.send ("Pagina de Raiz")}
)
aplicacion.use(
    "/api", pagos, usuarios, consulta, empleados
);

//Ejecucion  llamado a llamar del .env
mongoose.connect(process.env.mongodb_conexion)
    .then(() => {console.log("Conexion realizada")})
    .catch((error) => {console.log(error)})
    

aplicacion.listen(puerto, () => { console.log("Aplicacion ejecutandose")})