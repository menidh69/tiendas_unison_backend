const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Ordenitem = require('../models/OrdenItem');
const Productos = require('../models/Productos');
const sgMail = require("@sendgrid/mail");
const Info_Stripe = require('../models/Info_Stripe');
const Tienda = require('../models/Tienda')
sgMail.setApiKey('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');



//crear orden
router.post("/nuevaOrden", async (req, res) => {
  let total = 0;
  const orden = await Orden.create({
      id_usuario: req.body.id_usuario,
      id_tienda: req.body.id_tienda,
      fecha: Date.now(), 
      entregado: false
  })
    req.body.productos.map(item=>{
      let ordenitem = {
        id_orden:  orden.id,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      }
      total += item.subtotal;
      Ordenitem.create(ordenitem)
      
    })
    const tienda = Tienda.findOne({where:{id: req.body.id_tienda}, include: Info_Stripe})
    console.log(tienda)
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: total,
      currency: 'mxn',
      application_fee_amount: 500,
    }, {
      stripeAccount: tienda.infos_stripe.id_stripe,
    });
    return res.json({status: "success", client_secret: paymentIntent.client_secret})
 
})

function realizarTransaccion(){
  return "Implementacion pendiente"
}


module.exports = router;
