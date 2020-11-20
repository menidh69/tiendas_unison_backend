const express = require('express');
const router = express.Router();
const Info_bancaria = require('../models/Info_bancaria');
const Usuario = require('../models/Usuario');
const stripe = require("stripe")("sk_test_51HoJ01K9hN8J4SbUcq7jtJksCYl3w6LRNJbLXiWLmtRBdyX6M68fdjwuoYbrf1pc8i1R54cN1dVy8D5jfpYkHCHH00KUpKrBFG");
const Tienda = require('../models/Tienda');
const Info_Stripe = require('../models/Info_Stripe');


// router.get("/infobanco/:id", async (req, res)=>{
//   try{
//       const todas = await Info_bancaria.findAll({where: {id_usuario: req.params.id}})
//       .then(result =>{
//           res.json(result);
//       })
//   }catch(err){
//       console.error(err)
//       console.log(err);
//   }
// })

//GET ACCOUNT LINK DE STRIPE CON ID TIENDA
router.get("/stripeInfo/accountLink/:id_tienda", async (req, res)=>{
    const infoStripe = await Info_Stripe.findOne({where:{id_tienda: req.params.id_tienda}})
    const account = await stripe.accounts.retrieve(infoStripe.id_stripe);
    if(account.charges_enabled){
        return res.json({status: "Success", stripe: true})
    }else{
        const accountLinks = await stripe.accountLinks.create({
            account: infoStripe.id_stripe,
            refresh_url: 'https://localhost:3000/',
            return_url: 'https://localhost:3000/',
            type: 'account_onboarding',
            });
            return res.json({status: "success", accountLink: accountLinks, stripe: false})
    }


    
});


//GET ID_STRIPE CON ID TIENDA
router.get("/stripeInfo/:id_tienda", async (req, res)=>{
    const infoStripe = await Info_Stripe.findOne({where:{id_tienda: req.params.id_tienda}})
    if(!infoStripe || infoStripe==''){
        return res.json({status: "failed", message: "Ocurrió un error"})

    }else{
        res.json({status: "success", infoStripe: infoStripe})
    }
});

//UPDATE
router.put("/infobanco/:id", async (req, res)=>{
    const info = await Info_bancaria.update({nombre_titular: req.body.nombre_titular, num_tarjeta: req.body.num_tarjeta,
      exp_date: req.body.exp_date, cvv:req.body.cvv, cpp:req.body.cpp},{where: {id: req.params.id}})
      .then(result=>{

          res.json({status: 'success'})
      })
})
module.exports = router;
