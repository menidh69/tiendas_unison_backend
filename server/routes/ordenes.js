const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Ordenitem = require('../models/OrdenItem');
const Productos = require('../models/Productos');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



//crear orden
router.post("/NuevaOrden/:id", (req, res) => {
  const orden = {
      id_usuario: req.params.id,
      fecha: Date.now()
  }
   Orden.create(orden)
  .then(ordenCreada=>{
    req.body.map(item=>{
      let ordenitem = {
        id_orden:  ordenCreada.id,
        id_producto: item.id_producto,
        cantidad: item.cantidad
      }
      Ordenitem.create(ordenitem)
      .then(itemCreado=>{
        console.log(itemCreado)
        console.log("--------------")
      })
    })
    realizarTransaccion()
    .then(message=>{
      console.log(message)
      res.json({status: "Transaccion realizada", message: message})
      
    })

  })
  .catch(err=>{

  })
  
})

function realizarTransaccion(){
  return "Implementacion pendiente"
}


module.exports = router;
