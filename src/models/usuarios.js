const mongoose = require("mongoose");

const usuariosModel = new mongoose.Schema({
    dni: {
      type: Number,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    Sexo: {
      type: String,
      required: true, 
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
});

module.exports = mongoose.model("usuarios", usuariosModel)