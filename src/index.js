//Lamada a los paquetes
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const empleados = require("./routes/empleados")
const pagos = require("./routes/pagos-facturas")
const usuarios = require("./routes/usuarios")
const consulta = require("./routes/informacion-consultoria")
require("dotenv").config()
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const path = require("path")


//Configuraciones
const aplicacion = express();
const puerto = 3000;
const swaggerConf = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Technologi",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [` ${path.join(__dirname, "./routes/*js")} `]

}


// Middleware(Sistema de software para intercambio de info) para analizar el cuerpo de la solicitud
aplicacion.use(express.json());

// Middleware CORS
aplicacion.use(cors());

//rutas
aplicacion.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})
aplicacion.use(
    "/api", pagos, usuarios, consulta, empleados
);
aplicacion.use(
    "/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf))
);

//Ejecucion  llamado a llamar del .env
mongoose.connect(process.env.mongodb_conexion)
    .then(() => { console.log("Conexion realizada") })
    .catch((error) => { console.log(error) })


aplicacion.listen(puerto, () => { console.log("Aplicacion ejecutandose") })