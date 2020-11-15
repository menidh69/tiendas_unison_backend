const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Ordenitem = require('../models/OrdenItem');
const Productos = require('../models/Productos');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



//crear orden
router.post("/NuevaOrden/:id", async (req, res) => {
  const orden = {
      id_usuario: req.params.id,
      fecha: Date.now()
  }
  Orden.create(orden)

  for (var i = 0; i < req.body.length; i++) {
    console.log("loop ", req.body[i]);
  }

})


module.exports = router;
