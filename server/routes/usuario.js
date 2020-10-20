const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');



router.post("/usuarios", async (req, res)=>{
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        universidad: req.body.universidad
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

module.exports = router;