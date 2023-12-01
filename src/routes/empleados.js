const express = require("express")
const router = express.Router();
const empleadosModel = require("../models/empleados")

//getF
router.get("/empleados", (req, res) => {
    empleadosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});


//get con nombre, cargo y correo
router.get("/empleados/filtrar", (req, res) => {
    const { nombre, cargo, correo } = req.query;

    // funcion de busquedad
    const busqueda = {};
    if (nombre) {
        busqueda.nombre = nombre;
    }
    if (cargo) {
        busqueda.cargo = cargo;
    }
    if (correo) {
        busqueda.correo = correo;
    }

    // utilizamos find para la busquedad
    empleadosModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
// POST
router.post("/empleados", (req, res) => {
    const empleado = new empleadosModel(req.body);
    empleado.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

// PUT
router.put("/empleados/:id", (req, res) => {
    const { id } = req.params;
    const { nombre,cargo, correo } = req.body;
    empleadosModel.updateOne({_id: id}, {$set:{ nombre,cargo, correo}})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

//DELETE

router.delete("/empleados/:id", (req, res) => {
    const {id} =req.params;
    empleadosModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Empleado correctamente eliminado"}))
    .catch((error) => res.json({mensaje: error}))
})

// seleccionar los metodos adecuados y agregar mas info para las busquedas
module.exports = router


