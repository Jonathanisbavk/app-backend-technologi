const express = require("express")
const router = express.Router();
const usuariosModel = require("../models/usuarios")


/**
 * @swagger
 * components:
 *  schemas:
 *      usuarios:
 *          type: object
 *          properties:
 *              dni:
 *                  type: Number
 *                  description: Dni del cliente.
 *              edad:
 *                  type: Number
 *                  description: Edad del cliente.
 *              nombre:
 *                  type: string
 *                  description: Nombre del cliente.
 *              apellido:
 *                  type: string
 *                  description: Apellido del cliente.
 *              Sexo:
 *                  type: string
 *                  description: Sexo del cliente.
 *              correo:
 *                  type: string
 *                  description: Correo del cliente.
 *          required:
 *              - dni
 *              - edad
 *              - nombre
 *              - apellido
 *              - Sexo
 *              - correo
 *          example:
 *              dni: 10000000
 *              edad: 20
 *              nombre: Juanito
 *              apellido: Lopez
 *              Sexo: Masculino
 *              correo: juanito.lopez@examples.com
 */



// GET (Mostrar todas los clientes)

router.get("/usuarios", (req, res) => {
    usuariosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});

// GET CON disque Parametro de busqueda (buscar clientes por dni, apellido, correo)
router.get("/usuarios/filtrar", (req, res) => {
    const { dni, apellido, correo } = req.query;

    // funcion de busqueda
    const busqueda = {};
    if (dni) {
        busqueda.dni = dni;
    }
    if (apellido) {
        busqueda.apellido = apellido;
    }
    if (correo) {
        busqueda.correo = correo;
    }

    // utilizamos el metodo find para la busqueda
    usuariosModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

// Busquedas utilizando metodo find y agregar funcion

// POST (Agregar un nuevo usuario)
router.post("/usuarios", (req, res) => {
    const usuarios = new usuariosModel(req.body);
    usuarios.save()
    .then((data) => res.json({mensaje: "Registrado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// PUT
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { dni, edad, nombre, apellido, Sexo, correo } = req.body;
    usuariosModel.updateOne({_id: id}, {$set:{ dni, edad, nombre, apellido, Sexo, correo }})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


// DELETE

router.delete("/usuarios/:id", (req, res) => {
    const {id} =req.params;
    usuarioModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Usuario eliminado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
})

module.exports = router