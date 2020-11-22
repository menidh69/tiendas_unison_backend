const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Orden = require('../models/Orden');
const Ordenitem = require('../models/OrdenItem');
const Productos = require('../models/Productos');
const sgMail = require("@sendgrid/mail");
const Info_Stripe = require('../models/Info_Stripe');
const Tienda = require('../models/Tienda');
const { Carrito_item, Carrito } = require('../models/entities');
sgMail.setApiKey('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');
const stripe = require("stripe")("sk_test_51HoJ01K9hN8J4SbUcq7jtJksCYl3w6LRNJbLXiWLmtRBdyX6M68fdjwuoYbrf1pc8i1R54cN1dVy8D5jfpYkHCHH00KUpKrBFG");
const Venta= require('../models/Venta');


//crear orden
router.post("/nuevaOrden", async (req, res) => {
  // let total = 0;
  const info = await Info_Stripe.findOne({where:{id_stripe: req.body.id_stripe_tienda}})
  const items = Carrito.findAll({
    where: {
      id_usuario: req.body.id_user
    }, 
    include: {
      model: Carrito_item, 
      include: {
        model: Productos, where:{id_tienda: info.id_tienda}
      }
    }, raw: true
  })
  .then(async found=>{
    let id_carrito = ""
    const orden = await Orden.create({
      id_usuario: req.body.id_usuario,
      id_tienda: info.id_tienda,
      fecha: Date.now(), 
      entregado: false
  })
    found.map(async item=>{
      
      let ordenitem = {
            id_orden:  orden.id,
            id_producto: item['carrito_items.id_producto'],
            cantidad: item['carrito_items.cantidad'],
          }
          const newordenitem = await Ordenitem.create(ordenitem) 
          Carrito_item.destroy({where:{id_carrito: item.id, id_producto: newordenitem.id_producto}})

      
    })
    let venta = {
      id_orden: orden.id,
      id_transaccion: req.body.id_transaccion,
      amount: req.body.total
    }
    Venta.create(venta);
    return res.json({status: "Exito"})
  })
    // req.body.productos.map(item=>{
    //   let ordenitem = {
    //     id_orden:  orden.id,
    //     id_producto: item.id_producto,
    //     cantidad: item.cantidad,
    //     subtotal: item.subtotal
    //   }
    //   total += item.subtotal;
    //   Ordenitem.create(ordenitem)   
    // })
    // Carrito_item.findAll({where:{id}})

    
    
 
})





function realizarTransaccion(){
  return "Implementacion pendiente"
}


module.exports = router;
