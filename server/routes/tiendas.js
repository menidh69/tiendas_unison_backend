const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');
const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



router.post("/tiendas", async (req, res)=>{
    const tienda = {
        id_usuario: '',
        id_tipo_tienda: req.body.id_tipo_tienda,
        nombre: req.body.nombretienda,
        horario: req.body.horario,
        url_imagen: '',
        tarjeta: req.body.tarjeta
    }
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        universidad: req.body.universidad,
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

router.get("/tiendas/activas", async (req, res)=>{
    const todas = await Tienda.findAll(
        {
        where:{
            activo: 'True'
        }},
        {raw:true})
    .then(result => {
        res.json(result)
    })
})

router.get("/tiendainfo:id", async (req, res)=>{
  try{
      const tienda = await Tienda.findAll({where: {id: req.params.id}}) //jalar info de tienda especifica usando el id del usuario ?
      .then(result =>{
          res.json(result);
      })

  }catch(err){
      console.error(err)
      console.log(err);
  }
})

router.get("/tiendafecha:id", async (req, res)=>{
  try{
      const tienda = await Tienda.findOne({where: {id_usuario: req.params.id}}) //jalar toda la info de la tienda para luego usar solo la fecha
      .then(result =>{
          res.json(result);
      })

  }catch(err){
      console.error(err)
      console.log(err);
  }
})

router.post("/actualizarInfo:id", async (req, res)=>{
    const tienda = await Tienda.update({nombre: req.params.nombre}, {horario: req.params.horario},
      {url_imagen: req.params.url_imagen}, {tarjeta:req.params.tarjeta},{where: {id: req.params.id}})
      .then(result=>{
          res.json({status: 'success', Tienda:result})
      })
})

//BORRAR Tienda
router.delete("/tienda/:id", async (req, res)=>{
    try{
        const deleteTienda = await Tienda.destroy({where: {id: req.params.id}})
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
