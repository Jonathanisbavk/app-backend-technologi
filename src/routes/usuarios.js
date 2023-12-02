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


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *      summary: Lista de todos los usuarios 
 *      tags: [usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios
 *              content:
 *                  application/json:
 *                      schemas:
 *                          type: array
 *                      items:
 *                          $ref: '#/components/schemas/usuarios'
 *      
 */



// GET (Mostrar todas los clientes)

router.get("/usuarios", (req, res) => {
    usuariosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});

/**
 * @swagger
 * /api/usuarios/filtrar:
 *   get:
 *     summary: Filtrar usuarios por dni, apellido, correo
 *     tags: [usuarios]
 *     parameters:
 *       - in: query
 *         name: dni
 *         schema:
 *           type: Number
 *         description: Dni del usuario.
 *       - in: query
 *         name: apellido
 *         schema:
 *           type: string
 *         description: Apellido del usuario.
 *       - in: query
 *         name: correo
 *         schema:
 *           type: string
 *         description: Correo del usuario.
 *     responses:
 *       200:
 *         description: Usuarios filtrados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 */



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


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Agregar un nuevo usuario
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuarios'
 *     responses:
 *       200:
 *         description: Usuario agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación
 */


// Busquedas utilizando metodo find y agregar funcion

// POST (Agregar un nuevo usuario)
router.post("/usuarios", (req, res) => {
    const usuarios = new usuariosModel(req.body);
    usuarios.save()
    .then((data) => res.json({mensaje: "Registrado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar información de un usuario
 *     tags: [usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *       - in: body
 *         name: body
 *         required: true
 *         description: Datos actualizados del usuario
 *         schema:
 *          type: object
 *          properties:
 *              dni:
 *                  type: number
 *                  description: Dni del usuario.
 *              edad:
 *                  type: number
 *                  description: Edad del usuario
 *              nombre:
 *                  type: string
 *                  description: Nombre del usuario
 *              apellido:
 *                  type: string
 *                  description: Apellido del usuario
 *              Sexo:
 *                  type: string
 *                  description: Sexo del usuario
 *              correo:
 *                  type: string
 *                  description: Correo del usuario
 *          required:
 *              - dni
 *              - edad
 *              - nombre
 *              - apellido
 *              - Sexo
 *              - correo
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de confirmación
 */

// PUT
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { dni, edad, nombre, apellido, Sexo, correo } = req.body;
    usuariosModel.updateOne({_id: id}, {$set:{ dni, edad, nombre, apellido, Sexo, correo }})
    .then((data) => res.json({mensaje: "Actualizado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});


/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar informacion de un usuario
 *     tags: [usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *       - in: body
 *         name: body
 *         required: true
 *         description: Los datos eliminados del usuario
 *         schema:
 *          type: object
 *          properties:
 *              dni:
 *                  type: number
 *                  description: Dni del usuario.
 *              edad:
 *                  type: number
 *                  description: Edad del usuario
 *              nombre:
 *                  type: string
 *                  description: Nombre del usuario
 *              apellido:
 *                  type: string
 *                  description: Apellido del usuario
 *              Sexo:
 *                  type: string
 *                  description: Sexo del usuario
 *              correo:
 *                  type: string
 *                  description: Correo del usuario
 *          required:
 *              - dni
 *              - edad
 *              - nombre
 *              - apellido
 *              - Sexo
 *              - correo
 *     responses:
 *       200:
 *         description: El usuario se eliminó correctamente
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

router.delete("/usuarios/:id", (req, res) => {
    const {id} =req.params;
    usuarioModel.deleteOne ({_id:id})
    .then((data) => res.json({mensaje: "Usuario eliminado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
})

module.exports = router