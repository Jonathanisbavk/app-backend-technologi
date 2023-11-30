const express = require("express")
const router = express.Router();
const pagosModel = require("../models/pagos-facturas")

// GET (Mostrar todas las facturas)

router.get("/pagos-facturas", (req, res) => {
    pagosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});

// GET CON (uscar facturas por cliente, fecha, monto y estado)
router.get("/pagos-facturas/filtrar", (req, res) => {
    const { cliente, fecha, monto, estado } = req.query;

    // funcion de busquedad
    const busqueda = {};
    if (cliente) {
        busqueda.cliente = cliente;
    }
    if (fecha) {
        busqueda.fecha = fecha;
    }
    if (monto) {
        busqueda.monto = monto;
    }
    if (estado) {
        busqueda.estado = estado;
    }

    // utilizamos find para la busquedad
    pagosModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

// Busquedas utilizando metodo find y agregar funcion

// POST (Agregar una nueva factura)
router.post("/pagos-facturas", (req, res) => {
    const facturas = new pagosModel(req.body);
    facturas.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

module.exports = router