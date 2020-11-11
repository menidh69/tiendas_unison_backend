const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Info_bancaria = require('../models/Info_bancaria');
const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
const Carrito = require('../models/Carrito');
const Carrito_item = require('../models/CarritoItem');
const Productos = require('../models/Productos');
const { sequelize } = require('../db/db');

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
              .then(usuario=> {
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

// Carrito_item.hasOne(Productos, {as: 'id_producto', foreignKey:'id'})

router.get("/carritoItem/:id", async (req,res) => {
  try {
    // const carritoItem = await Carrito_item.findAll({
    // include: [
    //   {model: Productos}
    // ],
    // where: {id_carrito: req.params.id}})
    const carritoItem = await sequelize.query("SELECT carrito_item.id, carrito_item.id_producto, carrito_item.cantidad, productos.nombre, productos.precio FROM carrito_item INNER JOIN productos ON carrito_item.id_producto = productos.id WHERE id_carrito = " + req.params.id)
    // console.log(carritoItem)
    .then(result => {
      res.json(result);
    })
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

router.post("/agregarCarrito/:id_producto/:idCarrito/:cantidad", async (req,res) => {
  try {
    const carritoItem = {
      id_producto: req.params.id_producto,
      id_carrito: req.params.idCarrito,
      cantidad: req.params.cantidad
    }

    Carrito_item.create(carritoItem)
    .then(result => {
      res.json({status: "agregado con exito"})
    })
  } catch (error) {
    console.log(error);
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
