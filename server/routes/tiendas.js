const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');
const Ubicacion = require('../models/Ubicacion');
const Info_Stripe = require('../models/Info_Stripe');

const entities = require('../models/entities');

const Stripe_Customer = require('../models/Stripe_Customer');

const stripe = require("stripe")("sk_test_51HoJ01K9hN8J4SbUcq7jtJksCYl3w6LRNJbLXiWLmtRBdyX6M68fdjwuoYbrf1pc8i1R54cN1dVy8D5jfpYkHCHH00KUpKrBFG");
const Orden = require('../models/Orden')




//POST TIENDA + NEW USUARIO + NUEVA UBICACION
router.post("/tiendas", async (req, res)=>{
    const tienda = {
        id_usuario: '',
        id_tipo_tienda: req.body.tipo_tienda,
        nombre: req.body.nombretienda,
        horario: req.body.horario,
        url_imagen: req.body.url_imagen,
        tarjeta: req.body.tarjeta,
        fechaSub: Date.now(),
        validada: 'false',
        activo: 'false'
    }
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        id_universidad: req.body.universidad,
        tipo_usuario: 'tienda'
    }
    const ubicacion = {
        id_tienda: '',
        lat: req.body.lat,
        lng: req.body.lng
    }
    Usuario.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(async usuario =>{
        if(!usuario){
            await bcrypt.hash(req.body.contra, 10, async (err, hash) => {
              user.contra = hash
              await Usuario.create(user)
              .then(async usuario=> {
                tienda.id_usuario = usuario.id
                await Tienda.create(tienda)
                .then(async tiendacreada=>{
                    ubicacion.id_tienda = tiendacreada.id
                    await Ubicacion.create(ubicacion)
                    .then(async ubi=>{
                        const account = await stripe.accounts.create({
                            type: 'express',
                            country: "MX",
                            email: usuario.email,
                            capabilities: {
                                card_payments: {requested: true},
                                transfers: {requested: true},
                              }
                          });
                          const customer= await stripe.customers.create({
                              email: usuario.email
                          })
                          const infoStripe = {
                              id_tienda: tiendacreada.id,
                              id_stripe: account.id
                          }
                          const customer_info={
                              id_usuario: usuario.id,
                              id_stripe: customer.id
                          }
                          Info_Stripe.create(infoStripe)
                          Stripe_Customer.create(customer_info);
                        res.json({
                            status: tiendacreada.nombre + ': Tienda y usuario creada con exito'
                        })
                    }).catch(err=>{
                        console.log(err)
                        console.log("ocurrio error en ubi")
                        res.json({
                            status: 'Ocurrio un error al crear la tienda, vuelve a intentarlo',
                            error: err}
                            )
                    })
                
                })
                .catch(err=>{
                    res.json({
                        status: 'Ocurrio un error al crear la tienda, vuelve a intentarlo',
                        error: err}
                        )
                })
              }).catch(err=>{
                res.status(204).json({'error: ': err})
              })


            })
        }else{
            res.json({ error: "Ya existe un usuario con esa cuenta" })

        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
})


//GET INDEX TIENDAS
router.get("/tiendas", async (req, res)=>{
    const todas = await Tienda.findAll(
        {
        where:{
            activo: 1
        }},
        {raw:true})
    .then(result => {
        res.json(result)
    })
})

//GET INDEX TIENDAS BY ID_UNIVERSIDAD
router.get("/universidades/tiendas/:id_universidad", async (req, res)=>{
    const todas = await Usuario.findAll(
        {
        where:{
            id_universidad: req.params.id_universidad,
            tipo_usuario: 'tienda',
        }, include: [
            {
                model: Tienda, 
                where:{activo: 1},
                include: [
                    {
                        model: Ubicacion
                    }
                ]
            }
        ], raw:true})
    .then(result => {
        res.json(result)
    })
})


router.get("/universidades/tiendas/:id_universidad/all", async (req, res)=>{
    const todas = await Usuario.findAll(
        {
        where:{
            id_universidad: req.params.id_universidad,
            tipo_usuario: 'tienda'
        }, include: {model: Tienda, where:{activo: 1}}, raw:true})
    .then(result => {
        console.log(result)
        res.json(result)
    })
})



router.get("/miTienda/:id", async (req, res)=>{

    const todas = await Tienda.findAll(
        {
        where:{
            id_usuario: req.params.id
        }})
    .then(result => {
        console.log(result);
        res.json(result)
    })
})

//GET INDEX TIENDAS ACTIVAS
router.get("/tiendas/activas", async (req, res)=>{
    const todas = await Tienda.findAll(
        {
        where:{
            activo: 1
        }},
        {raw:true})
    .then(result => {
        res.json(result)
    })
})

//GET TIENDA BY ID
router.get("/tiendas/:id", async (req, res)=>{
    const todas = await entities.Tienda.findAll(
        {
        where:{
            id: req.params.id,
            activo: 1
        }, include: [
            {
                model: Ubicacion
            },
            {model: entities.Review_Tienda}
        ]},
        {raw:true})
    .then(result => {
        res.json({tienda: result})
    })
})

//GET INFO TIENDA BY USER ID
router.get("/tiendainfo/:id", async (req, res)=>{
  try{
      const tienda = await Tienda.findAll(
          {
              where: {id_usuario: req.params.id},
              include: Ubicacion, raw: true
            }
          )
      .then(result =>{
          //console.log(result);
          res.json(result);
          //console.log(res.json(result));
      })

  }catch(err){
      console.error(err)
      console.log(err);
  }
})

router.get("/tiendafecha/:id", async (req, res)=>{
  try{
      const tienda = await Tienda.findAll({
          where: {id_usuario: req.params.id},
          include: Info_Stripe, raw:true
        })
      .then(result =>{
          res.json(result);
      })
  }catch(err){
      console.error(err)
  }
})

//PUT nueva info en tiendas
router.put("/tiendas/:id", async (req, res)=>{
    const tienda = await Tienda.update({id_tipo_tienda: req.body.id_tipo_tienda, nombre: req.body.nombre, horario: req.body.horario,
      url_imagen: req.body.url_imagen, tarjeta:req.body.tarjeta},{where: {id_usuario: req.params.id}})
      .then(result=>{

          res.json({status: 'success', Tienda:result})
      })
})

//BORRAR Tienda y Usuario
router.delete("/tiendas/:id", async (req, res)=>{
    try{
        const deleteTienda = await Tienda.destroy({where: {id_usuario: req.params.id}})
        const deleteUsuario = await Usuario.destroy({where: {id: req.params.id}})
        .then(result=>{
            res.status(204).json({
                status: "success",
            });
        })
    }catch(err){
        console.error(err)
    }
})


//GET INDEX ubicacion de TIENDAS
router.get("/tiendas/ubicacion", async(req, res)=>{
    
})


//GET ubicacion en TIENDA BY USER ID
router.get("/tiendas/ubicacion/:id", async(req, res)=>{
    
})

//PUT ubicacion en TIENDA BY USER ID
router.put("/tiendas/ubicacion/:id_tienda", async(req, res)=>{
    const ubicacion = Ubicacion.update({lat: req.body.lat, lng: req.body.lng},{where:{id_tienda: req.params.id_tienda}})
    .then(result=>{
        if(result.error){
            return res.json({status: "Tienda o ubicacion de tienda no existe"})
        }else{
            return res.json({status: "Ubicacion actualizada con exito", result: result})
        }
    })
    .catch(err=>{
        return res.json({status: err})
    })
})

//GET pedidos de la tienda
router.get("/tiendas/pedidos/:id_usuario", async(req, res) => {
    
    try {
        const tienda = await entities.Tienda.findOne({
            where:{
                id_usuario: req.params.id_usuario
            }
        })
    
        const pedidos = await entities.Orden.findAll ({
            where: {
                id_tienda: tienda.id,
                entregado: 0
            },
            include: [
                {
                    model: entities.Usuario
                },
                {
                    model: entities.Ordenitem,
                    include: {
                        model: entities.Productos,
                        include: {
                            model: entities.Tienda
                        }
                    }
                }
            ]
        })
    
        res.json({result: pedidos});
        
    } catch (error) {
        console.log(error)
    }
})

//PUT entregar pedido al cliente
router.put("/tiendas/entregar/:id_orden", async(req,res) => {
    
    try {
        const orden = await Orden.update({entregado: 1}, {where: {id: req.params.id_orden}})
        .then(result =>{
            console.log(result)
            res.json({status: 'success'})
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
