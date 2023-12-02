const express = require("express")
const router = express.Router();
const infoModel = require("../models/informacion-consultoria")

/**
 * @swagger
 * components:
 *  schemas:
 *      informacion-consultoria:
 *          type: object
 *          properties:
 *              cliente:
 *                  type: string
 *                  description: Nombre del cliente.
 *              tipo_servicio:
 *                  type: string
 *                  description: Tipo de servicio requerido.
 *              fecha:
 *                  type: date
 *                  description: Fecha de la consulta.
 *              pregunta_frecuente:
 *                  type: string
 *                  description: Pregunta frecuente en la consulta.
 *              estado:
 *                  type: string
 *                  description: Estado de la consulta.
 *          required:
 *              - cliente
 *              - tipo_servicio
 *              - fecha
 *              - pregunta_frecuente
 *              - estado
 *          example:
 *              cliente: Movistar
 *              tipo_servicio: Consulta de Ciberseguridad
 *              fecha: 2023-11-24T12:00:00.000Z
 *              pregunta_frecuente: ¿Cuanto está la consulta de ciberseguridad?
 *              estado: Pendiente
 */

/**
 * @swagger
 * /api/informacion-consultoria:
 *  get:
 *      summary: Lista de todas las consultas de información de consultoría.
 *      tags: [informacion-consultoria]
 *      responses:
 *          200:
 *              description: Consultas de información de consultoría mostradas correctamente.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/informacion-consultoria'
 */
// GET
router.get("/informacion-consultoria", (req, res) => {
    infoModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
}); 

/**
 * @swagger
 * /api/informacion-consultoria/filtrar:
 *  get:
 *      summary: Buscar consultas de información de consultoría por cliente, fecha y estado.
 *      tags: [informacion-consultoria]
 *      parameters:
 *          - in: query
 *            name: cliente
 *            schema:
 *              type: string
 *            description: Nombre del cliente para filtrar.
 *          - in: query
 *            name: fecha
 *            schema:
 *              type: date
 *            description: Fecha de la consulta para filtrar.
 *          - in: query
 *            name: estado
 *            schema:
 *              type: string
 *            description: Estado de la consulta para filtrar.
 *      responses:
 *          200:
 *              description: Consultas de información de consultoría filtradas correctamente.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/informacion-consultoria'
 */
// GET con ID
//CLIENTE, FECHA, ESTADO

router.get("/informacion-consultoria/filtrar", (req, res) => {
    const { cliente, fecha, estado } = req.query;

    // funcion de busquedad
    const busqueda = {};
    if (cliente) {
        busqueda.cliente = cliente;
    }
    if (fecha) {
        busqueda.fecha = fecha;
    }
    if (estado) {
        busqueda.estado = estado;
    }

    // utilizamos find para la busquedad
    infoModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/informacion-consultoria:
 *  post:
 *      summary: Agregar una nueva consulta de información de consultoría.
 *      tags: [informacion-consultoria]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/informacion-consultoria'
 *      responses:
 *          200:
 *              description: Consulta de información de consultoría guardada correctamente.
 *          404:
 *              description: Error al procesar la solicitud.
 */
// POST
router.post("/informacion-consultoria", (req, res) => {
    const consulta = new infoModel(req.body);
    consulta.save()
    .then((data) => res.json({mensaje: "Consulta guardada correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});



module.exports = router