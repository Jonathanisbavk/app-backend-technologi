const express = require("express")
const router = express.Router();
const usuariosModel = require("../models/usuarios")

//getF
router.get("/usuarios", (req, res) => {
    usuariosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});


//get con id
router.get("/usuarios/:id", (req, res) => {
    const {id} =req.params;
    usuariosModel.findById (id)
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
})

// POST
router.post("/usuarios", (req, res) => {
    const newuser = new usuariosModel(req.body);
    newuser.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// PUT
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { dni, edad, nombre, apellido, sexo, correo } = req.body;
    usuariosModel.updateOne({_id: id}, {$set:{dni, edad, nombre, apellido, sexo, correo}})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


//DELETE

router.delete("/usuarios/:id", (req, res) => {
    const {id} =req.params;
    usuariosModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Objeto eliminado"}))
    .catch((error) => res.json({mensaje: error}))
})


module.exports = router