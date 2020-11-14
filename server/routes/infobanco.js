const express = require('express');
const router = express.Router();
const Info_bancaria = require('../models/Info_bancaria');



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
    Info_bancaria.create(infobanco)
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
