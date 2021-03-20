const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

const sgMail = require("@sendgrid/mail");
const Info_Stripe = require('../models/Info_Stripe');
const Tienda = require('../models/Tienda');
const { Carrito_item, Carrito } = require('../models/entities');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require("stripe")(process.env.STRIPE_KEY);
const {Productos, Orden, Ordenitem, Venta} = require('../models/entities')


//crear orden
// router.post("/nuevaOrden", async (req, res) => {
//   // let total = 0;
//   const info = await Info_Stripe.findOne({where:{id_stripe: req.body.id_stripe_tienda}})
//   const items = await Carrito.findAll({
//     where: {
//       id_usuario: req.body.id_user
//     }, 
//     include: {
//       model: Carrito_item, 
//       include: {
//         model: Productos, where:{id_tienda: info.id_tienda}
//       }
//     }, raw: true
//   })
  
    
//     const orden = await Orden.create({
//       id_usuario: req.body.id_usuario,
//       id_tienda: info.id_tienda,
//       fecha: Date.now(), 
//       entregado: false
//   })
//     await items.map(async item=>{
//       let ordenitem = {
//             id_orden:  orden.id,
//             id_producto: item['carrito_items.id_producto'],
//             cantidad: item['carrito_items.cantidad'],
//           }
//           const newordenitem = await Ordenitem.create(ordenitem) 
//           Carrito_item.destroy({where:{id_carrito: item.id, id_producto: newordenitem.id_producto}})  
//     })

//     let venta = {
//       id_orden: orden.id,
//       id_transaccion: req.body.id_transaccion,
//       amount: req.body.total
//     }
//     await Venta.create(venta);
//     return res.json({status: "Exito"})
//   })


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



router.get("/orden/:id_transaccion", async (req, res)=>{
  const registroVenta = await Venta.findOne({
    where:{
      id_transaccion: req.params.id_transaccion
    }, include: {
      model: Orden,
      include: {
        model: Ordenitem,
        include:{
          model: Productos
        }
      }
    }
  })

  res.json({venta: registroVenta})

})




function realizarTransaccion(){
  return "Implementacion pendiente"
}


module.exports = router;
