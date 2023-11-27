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
router.get("/cnformacion-consultoria/:id", (req, res) => {
    const {id} =req.params;
    infoModel.findById (id)
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// POST
router.post("/informacion-consultoria", (req, res) => {
    const consulta = new infoModel(req.body);
    consulta.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// PUT
router.put("/informacion-consultoria/:id", (req, res) => {
    const { id } = req.params;
    const { cliente, tipo_servicio, fecha, pregunta_frecuente, estado } = req.body;
    infoModel.updateOne({_id: id}, {$set:{cliente, tipo_servicio, fecha, pregunta_frecuente, estado}})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// DELETE

router.delete("/informacion-consultoria/:id", (req, res) => {
    const {id} =req.params;
    infoModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Objeto eliminado"}))
    .catch((error) => res.json({mensaje: error}))
})


module.exports = router