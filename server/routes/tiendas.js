const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');





//POST TIENDA + NEW USUARIO
router.post("/tiendas", async (req, res)=>{
    const tienda = {
        id_usuario: '',
        id_tipo_tienda: req.body.id_tipo_tienda,
        nombre: req.body.nombretienda,
        horario: req.body.horario,
        url_imagen: req.body.url_imagen,
        tarjeta: req.body.tarjeta,
        fechaSub: Date.now()
    }
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        id_universidad: req.body.universidad,
        tipo_usuario: 'tienda'
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
                    res.json({
                        status: tiendacreada.nombre + ': Tienda y usuario creada con exito'
                    })
                })
                .catch(err=>{
                    res.json({
                        status: 'Ocurrio un error al crear la tienda, vuelve a intentarlo'}
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
        //{
        // where:{
        //     activo: 'True'
        // }},
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
            tipo_usuario: 'tienda'
        }, include: Tienda, raw:true})
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
        // {
        // where:{
        //     activo: 'True'
        // }},
        {raw:true})
    .then(result => {
        res.json(result)
    })
})

//GET TIENDA BY ID
router.get("/tiendas/:id", async (req, res)=>{
    const todas = await Tienda.findAll(
        {
        where:{
            id: req.params.id
        }},
        {raw:true})
    .then(result => {
        res.json({tienda: result})
    })
})


router.get("/tiendainfo/:id", async (req, res)=>{
  try{
      const tienda = await Tienda.findAll({where: {id_usuario: req.params.id}})
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
      const tienda = await Tienda.findAll({where: {id_usuario: req.params.id}})
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


module.exports = router;
