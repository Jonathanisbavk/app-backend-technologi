const express = require("express")
const router = express.Router();
const empleadosModel = require("../models/Empleados")

//getF
router.get("/empleados", (req, res) => {
    empleadosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});


//get con id
router.get("/empleados/:id", (req, res) => {
    const {id} =req.params;
    empleadosModel.findById (id)
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

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
    const { dni, edad, nombre, apellido, sexo, correo } = req.body;
    empleadosModel.updateOne({_id: id}, {$set:{dni, edad, nombre, apellido, sexo, correo}})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

//DELETE

router.delete("/empleados/:id", (req, res) => {
    const {id} =req.params;
    empleadosModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Objeto eliminado"}))
    .catch((error) => res.json({mensaje: error}))
})

// seleccionar los metodos adecuados y agregar mas info para las busquedas
module.exports = router


