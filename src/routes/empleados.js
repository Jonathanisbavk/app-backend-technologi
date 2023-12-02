const express = require("express");
const router = express.Router();
const empleadosModel = require("../models/empleados");

// Version your API by adding a version number in the route
const apiVersion = "/v1";

// GET (Mostrar todas los empleados)
router.get(`${apiVersion}/empleados`, (req, res) => {
    empleadosModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

// GET con nombre, cargo y correo (buscar empleado por nombre, cargo y correo)
router.get(`${apiVersion}/empleados/filtrar`, (req, res) => {
    const { nombre, cargo, correo } = req.query;

    // Función de búsqueda
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

    // Utilizamos find para la búsqueda
    empleadosModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

// POST (Agregar un nuevo empleado)
router.post(`${apiVersion}/empleados`, (req, res) => {
    const empleado = new empleadosModel(req.body);
    empleado.save()
        .then((data) => res.json({ mensaje: "Guardado correctamente" }))
        .catch((error) => res.json({ mensaje: error }));
});

// PUT
router.put(`${apiVersion}/empleados/:id`, (req, res) => {
    const { id } = req.params;
    const { nombre, cargo, correo } = req.body;
    empleadosModel.updateOne({ _id: id }, { $set: { nombre, cargo, correo } })
        .then((data) => res.json({ mensaje: "Actualizado correctamente" }))
        .catch((error) => res.json({ mensaje: error }));
});

// DELETE
router.delete(`${apiVersion}/empleados/:id`, (req, res) => {
    const { id } = req.params;
    empleadosModel.deleteOne({ _id: id })
        .then((data) => res.json({ mensaje: "Objeto eliminado" }))
        .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;


