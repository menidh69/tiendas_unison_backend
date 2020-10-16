const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const crypto = require("crypto")
const bcrypt = require('bcrypt')
const {Op} = require('sequelize');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
const jwt = require('jsonwebtoken');


router.get('/api/v1/auth/user', auth, async (req, res)=>{
    await Usuario.findOne({
        where:{
            id: req.user.id
        }})
        .then(async user => {
            console.log(user.dataValues)
            res.json(user.dataValues)
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        });
})

router.post("/api/v1/usuario/login", async (req, res)=>{
    Usuario.findOne({
        where:{
            email: req.body.email 
        } 
        
    })
    .then (user => {
        if (!user) {
            return res.status(401).json({
                message: 'Usuario no existe'
            });
        }
        bcrypt.compare(req.body.contra, user.contra).then ((result) => {
            console.log(result)
            if(!result) return res.status(400).json({message: 'Invalid credentials'});
            jwt.sign(
                {id: user.id},
                'secretosupersecreto', //ESTE SECRETO DEBERA GUARDARSE EN ARCHIVO DE CONGIFURACION DESPUES
                {expiresIn: 3600},
                (err, token) =>{
                    if(err) throw err;
                    console.log(token)
                    res.json({
                        user: {
                            token,
                            isLoggedIn: result,
                            id: user.id,
                            nombre: user.nombre,
                            email: user.email,
                            tipo_usuario: user.tipo_usuario
                        }
                    })
                }
            )
            
            // if (result) {
            //     return res.status(200).json({
            //         message: 'we did it'
            //     })
            // }else {
            //     res.status(404).json({
            //         message: 'fallo bro',
            //     })
            // }
            
        });
        
        // bcrypt.hash(req.body.contra, 10, function(err,hash) {
        //     if(err) {
        //         throw (err);
        //     }
        //     console.log(user.contra)
        //     console.log(req.body.contra)
        //     console.log(hash)
        //     bcrypt.compare(req.body.contra, user.contra).then((result) => {
        //         console.log(result)
        //         if (result) {
        //             return res.status(200).json({
        //                 message: 'Auth succesful'
        //             })
        //         } else {
        //             res.status(404).json({
        //                 message: 'fallobrother'
        //             })
        //         }
        //     })
        // })
        
    })

    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
      
  })

router.post("/olvidarcontra",(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        Usuario.findOne({where:{email:req.body.email}})
        .then(user=>{
            if(!user){
               return res.status(422).json({error:"User doesnt exist with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                const msg ={
                    to: user.email,
                    from: "tiendasuniv@hotmail.com",
                    subject: "Reestablecer Contraseña",
                    html: `
                    <h1> Reestablece tu contraseña </h1>
                    <h5> Haz click en este <a href="https://localhost:3000/reestablecer/${token}">link</a> para reestablecer tu contraseña.
                    `,
                }
                sgMail.send(msg);
                res.json({message: 'Revisa tu correo'})
              })
            })

        })
    });

router.post('/new-password',(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   console.log(sentToken)
   console.log(new Date(Date.now()))
   Usuario.findOne({
       where:{
           resetToken:sentToken,
           expireToken:{[Op.gt]: new Date(Date.now()),}
        }
    })
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,10).then(hashedpassword=>{
          user.contra = hashedpassword
          user.resetToken = null
          user.expireToken = null
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
}) 

module.exports = router;