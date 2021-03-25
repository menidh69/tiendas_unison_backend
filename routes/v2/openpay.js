
const express = require('express');
const router = express.Router();
var Openpay = require('openpay');
const {Carrito, Carrito_item, Productos} = require('../../models/entities')
const Usuario = require('../../models/Usuario');
var openpay = new Openpay('mzow0ra2mxgbaxeyu2uh', 'sk_782e009e6b864f5fa45c015928460f30', [false]);
const Orden = require('../../models/Orden')
const Ordenitem = require('../../models/OrdenItem')
const Venta = require('../../models/Venta')
const Openpay_customer = require('../../models/Openpay_customer')
//RUTAS PARA GUARDAR TARJETA

//----------RUTAS PARA CARGOS-------------------

//POST

router.post("/openpay/create_charge", async(req, res)=>{

    const user_id = req.body.user_id
    var amount = ""
    var nombre_tienda = ""
    var first_name = ""
    var last_name = ""
    var phone_number = ""
    var email = ""
    //METODO PARA OBTENER PRECIO Y PRODUCTOS
    const items = await Carrito.findAll({
        where: {
          id_usuario: user_id
        }, 
        include: {
          model: Carrito_item, 
          include: {
            model: Productos
          }
        }, raw: true
      })

      //Tienda de productos
      let id_tienda = items[0]['carrito_items.producto.id_tienda'];
  
      console.log(id_tienda);
      let total=0;
      
      await items.map(item=>{
        total += item['carrito_items.producto.precio']*item['carrito_items.cantidad']
      })
 
    //METODO PARA OBTENER EL CARD_ID
    const openpay_customer = await Openpay_customer.findOne({where: {
        id_usuario: user_id
    }, raw: true})

    //METODO PARA OBTENER USUARIO
    const user = await Usuario.findOne({where:{
        id: user_id
    }, raw: true});

    var chargeRequest = {
        'source_id' : openpay_customer.card_id,
        'method' : 'card',
        'amount' : total,
        'description' : "Compra en College Marketplace a la tienda"+nombre_tienda,
        'device_session_id' : req.body.device_session_id,
        'customer' : {
             'name' : user.nombre,
             'last_name' : user.apellido,
             'phone_number' : user.telefono,
             'email' : user.email
        }
     }

     openpay.customers.charges.create(chargeRequest, async function(error, charge) {
         if(!error || error==""){
            const orden = await Orden.create({
                id_usuario: infoCliente.id_usuario,
                id_tienda: id_tienda,
                fecha: Date.now(), 
                entregado: false
            })
              await items.map(async item=>{
                let ordenitem = {
                      id_orden:  orden.id,
                      id_producto: item['carrito_items.id_producto'],
                      cantidad: item['carrito_items.cantidad'],
                    }
                    console.log(item)
                    const newordenitem = await Ordenitem.create(ordenitem) 
                    Carrito_item.destroy({where:{id_carrito: item.id, id_producto: newordenitem.id_producto}})  
              })

              //METODO PARA CREAR VENTA
              let venta = {
                id_orden: orden.id,
                id_transaccion: charge.id,
                amount: charge.amount
              }
              await Venta.create(venta);     

            //METODO PARA ACTUALIZAR BALANCE
            await Balance.increment(
                { balance: +charge.amount - 2 },
                { where: { id_tienda: id_tienda } }
              )

            .then(new_balance=>{
                res.json({"success": new_balance})
            })

         }else{
             res.json({"error": error})
         }
      });
    
})


router.post('/openpay/savecard', async (req, res)=> {
    await Usuario.findOne ({
        where:{
            id: req.body.user_id
        }
    })
    .then(async user => {
        console.log(user)
        
        var customerRequest = {
            'name': req.body.nombre,
            'email': req.body.email,
            'requires_account': false
        };
        
        openpay.customers.create(customerRequest, function(error, customer) {
            // ...
            try {

                var cardRequest = {
                'token_id' : req.body.token_id,
                'device_session_id' : req.body.device_session_id
                }
                  
                openpay.customers.cards.create(customer.id, cardRequest, function(error, card)  {
                // ...
                try {
                    var customer_openpay = {
                        'id_usuario': user.id,
                        'customer_id': customer.id,
                        'card_id': card.id
                    }

                    Openpay_customer.create(customer_openpay, function(error, cuenta) {
                        res.json({"Mensaje": cuenta})
                    })
                    
                } catch (error) {
                    res.json({"mensaje": "no se pudo crear el customer",
                    "error": error})
                }
                });
                
            } catch (error) {
                res.json({"mensaje": "no se pudo crear la tarjeta",
            "error": error})
            }
        });

    })
    .catch(err=>{
        console.log(err)
        res.json({"error": err})
    });

});


module.exports = router;