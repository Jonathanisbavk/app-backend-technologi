const express = require("express")
const router = express.Router();
const empleadosModel = require("../models/empleados")

/**
 * @swagger
 * components:
 *   schemas:
 *     empleados:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         cargo:
 *           type: string
 *           description: Cargo del empleado
 *         correo:
 *           type: string
 *           description: Correo electrónico del empleado
 *       required:
 *         - nombre
 *         - cargo
 *         - correo
 *       example:
 *         nombre: Juancito
 *         cargo: Desarrollador Full Stack
 *         correo: juancito@technologi.com
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/empleados'
 */


//getF
router.get("/empleados", (req, res) => {
    empleadosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});

/**
 * @swagger
 * /empleados/filtrar:
 *   get:
 *     summary: Filtrar empleados por nombre, cargo y correo
 *     tags: [empleados]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del empleado a filtrar
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Cargo del empleado a filtrar
 *       - in: query
 *         name: correo
 *         schema:
 *           type: string
 *         description: Correo electrónico del empleado a filtrar
 *     responses:
 *       200:
 *         description: Lista de empleados filtrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/empleados'
 */

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

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Agregar un nuevo empleado
 *     tags: [empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/empleados'
 *     responses:
 *       200:
 *         description: Empleado agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación
 */

// POST
router.post("/empleados", (req, res) => {
    const empleado = new empleadosModel(req.body);
    empleado.save()
    .then((data) => res.json({mensaje: "Guardado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

/**
 * @swagger
 * /empleados/{identifier}:
 *   put:
 *     summary: Actualizar el cargo de un empleado por nombre o correo
 *     tags: [empleados]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o correo del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cargo:
 *                 type: string
 *                 description: Nuevo cargo del empleado
 *     responses:
 *       200:
 *         description: Cargo del empleado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación
 */
router.put("/empleados/:identifier", (req, res) => {
    const { identifier } = req.params;
    const { cargo } = req.body;

    empleadosModel.updateOne({ $or: [{ nombre: identifier }, { correo: identifier }] }, { $set: { cargo } })
        .then((data) => res.json({ mensaje: "Cargo actualizado correctamente" }))
        .catch((error) => res.json({ mensaje: error }))
});

/**
 * @swagger
 * /empleados/{identifier}:
 *   delete:
 *     summary: Eliminar un empleado por nombre o correo
 *     tags: [empleados]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o correo del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación
 */

// DELETE
router.delete("/empleados/:identifier", (req, res) => {
    const { identifier } = req.params;

    empleadosModel.deleteOne({ $or: [{ nombre: identifier }, { correo: identifier }] })
        .then((data) => res.json({ mensaje: "Empleado eliminado correctamente" }))
        .catch((error) => res.json({ mensaje: error }))
});


module.exports = router


