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

module.exports = router;

