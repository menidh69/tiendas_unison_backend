const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Info_bancaria = require('../models/Info_bancaria');
const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
const Carrito_item = require('../models/CarritoItem');
const Carrito = require('../models/Carrito');
const Info_Stripe = require('../models/Info_Stripe')
const Productos = require('../models/Productos');
const { sequelize } = require('../db/db');
const Tienda = require('../models/Tienda');
const entities = require('../models/entities')
const Stripe_Customer = require("../models/Stripe_Customer")
const stripe = require("stripe")("sk_test_51HoJ01K9hN8J4SbUcq7jtJksCYl3w6LRNJbLXiWLmtRBdyX6M68fdjwuoYbrf1pc8i1R54cN1dVy8D5jfpYkHCHH00KUpKrBFG");


router.post("/usuarios", async (req, res)=>{
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        id_universidad: req.body.universidad || req.body.id_universidad
    }
    console.log(user)
    Usuario.findOne({
        where:{
            email: user.email
        }
    })
    .then(usuario =>{
        if(!usuario){
            bcrypt.hash(req.body.contra, 10, (err, hash) => {
              user.contra = hash
              Usuario.create(user)
              .then(async usuario=> {
                const cart = {
                  id_usuario: usuario.id
                }
                Carrito.create(cart)
                const customer = await stripe.customers.create({
                  email: usuario.email,
                  description: "Usuario tiendas unison",
                  name: usuario.nombre
                });
                Stripe_Customer.create({id_usuario: usuario.id, id_stripe: customer.id})

                res.json({status: usuario.email + ' registrado con exito'})
                const msg ={
                    to: user.email,
                    from: "tiendasuniv@hotmail.com",
                    subject: "Registro a Tiendas Universitarias",
                    text: "Bienvenida",
                    html: "<h1>Espero y la pases bomba y te guste la pagina bye</h1>",
                }
                sgMail.send(msg);
              })
              .catch(err=>{
                res.send('error: ' + err)
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

//GET USUARIO POR EMAIL
router.get("/usuarios/:email", async (req, res)=>{
  try{
      const user = await Usuario.findOne({where:{email: req.params.email}})
      .then(result =>{
          res.json(result);
          status: "ok"
      })

  }catch(err){
      console.error(err)
  }
    /*Usuario.findOne({ //eso es lo del video  necesita agregar const jwt=require)'jsonwebtoken' y process.env.SECRET_KEY = 'secret'
      where: {
        email: req.body.email
      }
    })
    .then(usuario => {
      if (usuario) {
        if (bcrypt.compareSync(req.body.contra, usuario.contra)) {
          let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      }else{
        res.status(400).json({error: 'Usuario no existe'})
      }
    })
    .catch(err => {
      res.status(400).json({error:err})
    })*/
})



  router.delete("/usuarios/:id", async (req, res)=>{
    try{
        const deleteUsuario = await Universidad.destroy({where: {id: req.params.id}})
        .then(result=>{
            res.status(204).json({
                status: "success",
            });
        })
    }catch(err){
        console.error(err)
    }
})


router.get("/usuarioinfo/:id", async (req, res)=>{
  try{
      const user = await Usuario.findAll({where: {id: req.params.id}})
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


//CARRITO

// Productos.hasMany(Carrito_item, {as: 'producto', foreignKey: 'id_producto'});
// Carrito_item.belongsTo(Productos, {foreignKey: 'id'});


router.get("/carrito/:id", async (req, res) => {
  try {
    const carrito = await Carrito.findAll({where: {id_usuario: req.params.id}})
    

    .then(result => {
      res.json(result);
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/carritoCrear/:id", async (req, res) => {
  try {
    const c = {
      id_usuario: req.params.id
    }
    const crear = await Carrito.create(c)
    

    .then(result => {
      res.json(result);
    })
  } catch (error) {
    console.log(error)
  }
})

// Carrito_item.hasOne(Productos, {as: 'id_producto', foreignKey:'id'})

router.get("/carritoItem/:id", async (req,res) => {
  try {
    // const carritoItem = await Carrito_item.findAll({
    // include: [
    //   {model: Productos}
    // ],
    // where: {id_carrito: req.params.id}})
    const carritoItem = await sequelize.query("SELECT carrito_item.id, carrito_item.id_producto, carrito_item.cantidad, productos.nombre, productos.precio, productos.id_tienda, tienda.nombre as tienda_nombre FROM carrito_item INNER JOIN productos ON carrito_item.id_producto = productos.id INNER JOIN tienda ON productos.id_tienda = tienda.id WHERE id_carrito = " + req.params.id)
    // console.log(carritoItem)
    .then(result => {
      res.json(result);
    })
  } catch (error) {
    console.log(error);
  }
})

router.get("/carrito/payment/:id_usuario", async (req,res) => {
  try {
    const carritoInfo = await entities.Carrito.findAll({
      where:{
        id_usuario: req.params.id_usuario
      }, 
      include: { model: entities.Carrito_item,
        include: {
          model: entities.Productos,
          include: {
            model:Tienda, 
            include:{
              model: Info_Stripe
            }  
          }  
      }
    }, 
    })


    res.json({result: carritoInfo});
    
  } catch (error) {
    console.log(error);
  }
})


router.delete("/eliminarCarritoItem/:id", async (req, res)=>{
    
  Carrito_item.destroy({where:{
      id: req.params.id
  }})
  .then(result => {
      res.json(result)
  })
})

//router.get("/carritoItems")

router.post("/agregarCarrito/:id_user", async (req,res) => {
  const carrito = await Carrito.findOne({where: {id_usuario: req.params.id_user}, raw:true})
  const item = {
    id_producto: req.body.id_producto,
    cantidad: req.body.cantidad,
    id_carrito: carrito.id
  }

  const itemExiste = await Carrito_item.findOne({
    where:{
      id_carrito: carrito.id,
      id_producto: item.id_producto
    }, raw: true
  })
  console.log(itemExiste)
  if(!itemExiste || itemExiste==""){
    const newItem = await Carrito_item.create(item);
    return res.json({status: "success", item: newItem})

  }else{
    const cantidad = Number(itemExiste.cantidad) + Number(item.cantidad)
    const updated = await Carrito_item.update({cantidad: cantidad}, {where:{id_carrito: itemExiste.id_carrito, id_producto:itemExiste.id_producto}})
    return res.json({status: "updated", item: updated})
  }
  
})

//AQUI TERMINA LO DEL CARRITO


//info usuario e info bancaria
router.get("/usuarioinfoperfil/:id", async (req, res)=>{
  try{
      const user = await Usuario.findAll({where: {id: req.params.id}, include: Info_bancaria, raw:true})
      .then(result =>{
          res.json(result);
      })

  }catch(err){
      console.error(err)
      console.log(err);
  }
})



//PUT nueva info en usuario
router.put("/usuarios/:id", async (req, res)=>{
  const user = await Usuario.update({nombre: req.body.nombre, contra: req.body.contra,
    tel: req.body.tel},{where: {id: req.params.id}})
    .then(result=>{

        res.json({status: 'success', Usuario:result})
    })
})

//BORRAR Usuario
router.delete("/usuariosdelete/:id", async (req, res)=>{
  try{
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


module.exports = router;
