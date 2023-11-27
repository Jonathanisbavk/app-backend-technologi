const mongoose = require("mongoose");

const pagosModel = new mongoose.Schema({
    cliente: {
      type: String,
      required: true,
    },
    tipo_servicio: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
});


module.exports = mongoose.model("pagos-facturas", pagosModel)