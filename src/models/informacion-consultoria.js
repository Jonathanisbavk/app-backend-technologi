const mongoose = require("mongoose");

const infoModel = new mongoose.Schema({
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
    pregunta_frecuente: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
});


module.exports = mongoose.model("informacion-consultoria", infoModel)