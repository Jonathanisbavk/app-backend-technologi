const mongoose = require("mongoose");

const empleadosModel = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
});


module.exports = mongoose.model("empleados", empleadosModel)