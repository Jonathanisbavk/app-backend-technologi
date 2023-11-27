const express = require("express")
const router = express.Router();
const pagosModel = require("../models/pagos-facturas")

//getF
router.get("/pagos-facturas", (req, res) => {
    pagosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});


//get con id
router.get("/pagos-facturas/:id", (req, res) => {
    const {id} =req.params;
    pagosModel.findById (id)
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})
//busquedas con utilizar metodo find y la agregar funcion

// POST
router.post("/pagos-facturas", (req, res) => {
    const facturas = new pagosModel(req.body);
    facturas.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// PUT
router.put("/pagos-facturas/:id", (req, res) => {
    const { id } = req.params;
    const { cliente, tipo_servicio, fecha, monto, estado } = req.body;
    pagosModel.updateOne({_id: id}, {$set:{cliente, tipo_servicio, fecha, monto, estado}})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


//DELETE

router.delete("/pagos-facturas/:id", (req, res) => {
    const {id} =req.params;
    pagosModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Objeto eliminado"}))
    .catch((error) => res.json({mensaje: error}))
})


module.exports = router