const express = require("express")
const router = express.Router();
const pagosModel = require("../models/pagos-facturas")


/**
 * @swagger
 * components:
 *  schemas:
 *      pagos-facturas:
 *          type: object
 *          properties:
 *              cliente:
 *                  type: string
 *                  description: Nombre del cliente
 *              tipo_servicio:
 *                  type: string
 *                  description: Tipo de servicio requerido
 *              fecha:
 *                  type: date
 *                  description: Fecha que se realizo la factura
 *              monto:
 *                  type: number
 *                  description: Monto designado por la consulta
 *              estado:
 *                  type: string
 *                  description: Estado del pago
 *          required:
 *              - cliente
 *              - tipo_servicio
 *              - fecha
 *              - monto
 *              - estado
 *          example:
 *              cliente: Tunet
 *              tipo_servicio: Consulta de IoT
 *              fecha: 2023-09-18T12:00:00.000+00:00
 *              monto: 2400
 *              estado: pendiente
 */

/**
 * @swagger
 * /api/pagos-facturas:
 *  get:
 *      summary: Lista de todas las facturas de los clientes
 *      tags: [pagos-facturas]
 *      responses:
 *          200:
 *              description: Facturas mostradas correctamente
 *              content:
 *                  application/json:
 *                      schemas:
 *                          type: array
 *                      items:
 *                          $ref: '#/components/schemas/pagos-facturas'
 *      
 */
// GET (Mostrar todas las facturas)

router.get("/pagos-facturas", (req, res) => {
    pagosModel.find ()
    .then((data) => res.json(data))
    .catch((error) => res.json({mensaje: error}))
});
/**
 * @swagger
 * /api/pagos-facturas/filtrar:
 *   get:
 *     summary: Filtrar facturas por cliente, fecha, monto y estado
 *     tags: [pagos-facturas]
 *     parameters:
 *       - in: query
 *         name: cliente
 *         schema:
 *           type: string
 *         description: Nombre del cliente para filtrar facturas.
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha para filtrar facturas (en formato YYYY-MM-DD).
 *       - in: query
 *         name: monto
 *         schema:
 *           type: number
 *         description: Monto para filtrar facturas.
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Estado para filtrar facturas.
 *     responses:
 *       200:
 *         description: Facturas filtradas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/pagos-facturas'
 */

// GET CON (buscar facturas por cliente, fecha, monto y estado)
router.get("/pagos-facturas/filtrar", (req, res) => {
    const { cliente, fecha, monto, estado } = req.query;

    // funcion de busquedad
    const busqueda = {};
    if (cliente) {
        busqueda.cliente = cliente;
    }
    if (fecha) {
        busqueda.fecha = fecha;
    }
    if (monto) {
        busqueda.monto = monto;
    }
    if (estado) {
        busqueda.estado = estado;
    }

    // utilizamos find para la busquedad
    pagosModel.find(busqueda)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});

/**
 * @swagger
 * /api/pagos-facturas:
 *   post:
 *     summary: Agregar una nueva factura
 *     tags: [pagos-facturas]
 *     requestBody:
 *       description: Datos de la nueva factura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pagos-facturas'
 *     responses:
 *       200:
 *         description: Factura guardada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje indicando que la factura se ha guardado correctamente.
 *               required:
 *                 - mensaje
 */

// POST (Agregar una nueva factura)
router.post("/pagos-facturas", (req, res) => {
    const facturas = new pagosModel(req.body);
    facturas.save()
    .then((data) => res.json({mensaje: "Factura agregado correctamente"}))
    .catch((error) => res.json({mensaje: error}))
});

module.exports = router