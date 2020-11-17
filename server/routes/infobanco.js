const express = require('express');
const router = express.Router();
const Info_bancaria = require('../models/Info_bancaria');
const Usuario = require('../models/Usuario');



router.get("/infobanco/:id", async (req, res)=>{
  try{
      const todas = await Info_bancaria.findAll({where: {id_usuario: req.params.id}})
      .then(result =>{
          res.json(result);
      })
  }catch(err){
      console.error(err)
      console.log(err);
  }
})

//NUEVA INFO
router.post("/infobanco/:id", async (req, res)=>{
    const infobanco = {
        id_usuario: req.params.id,
        nombre_titular: req.body.nombre_titular,
        num_tarjeta: req.body.num_tarjeta,
        exp_date: req.body.exp_date,
        cvv: req.body.cvv,
        cpp: req.body.cpp
    }
    Usuario.findOne({where:{id: id_usuario}})
    .then(found=>{
        if(!found || found==""){

        }else{
            Info_bancaria.create(infobanco)
            // const account = await stripe.accounts.create({
            //     type: 'standard',
            //     country: "MX",
            //     email: found.email,
            //   });
            //   const accountLinks = await stripe.accountLinks.create({
            //     account: account.id,
            //     refresh_url: 'https://localhost:3000/',
            //     return_url: 'https://localhost:3000/',
            //     type: 'account_onboarding',
            //   });
        }
    })
})

//UPDATE
router.put("/infobanco/:id", async (req, res)=>{
    const info = await Info_bancaria.update({nombre_titular: req.body.nombre_titular, num_tarjeta: req.body.num_tarjeta,
      exp_date: req.body.exp_date, cvv:req.body.cvv, cpp:req.body.cpp},{where: {id: req.params.id}})
      .then(result=>{

          res.json({status: 'success'})
      })
})
module.exports = router;
