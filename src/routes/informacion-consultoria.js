const express = require("express")
const router = express.Router();
const infoModel = require("../models/informacion-consultoria")

// GET
router.get("/informacion-consultoria", (req, res) => {
    infoModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
}); 


// GET con ID
//CLIENTE, FECHA, ESTADO

router.get("/informacion-consultoria/filtrar", (req, res) => {
    const { cliente, fecha, estado } = req.query;

    // funcion de busquedad
    const busqueda = {};
    if (cliente) {
        busqueda.cliente = cliente;
    }
    if (fecha) {
        busqueda.fecha = fecha;
    }
    if (estado) {
        busqueda.estado = estado;
    }

    // utilizamos find para la busquedad
    infoModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
// POST
router.post("/informacion-consultoria", (req, res) => {
    const consulta = new infoModel(req.body);
    consulta.save()
    .then((data) => res.json({mensaje: "Consulta guardada correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});



module.exports = router