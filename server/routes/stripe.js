const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51HoJ01K9hN8J4SbUcq7jtJksCYl3w6LRNJbLXiWLmtRBdyX6M68fdjwuoYbrf1pc8i1R54cN1dVy8D5jfpYkHCHH00KUpKrBFG");
const uuid = require("uuid")
const Usuario = require('../models/Usuario');
const sgMail = require("@sendgrid/mail");
const Info_Stripe = require('../models/Info_Stripe');
sgMail.setApiKey('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');

router.post("/checkout", async (req, res) => {
  console.log("Request:", body);
  let error;
  let status;
  try {
    const { token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid();

    const charge = await stripe.charges.create({
      amount : Number.parseFloat(total).toFixed(2) * 100,
      currency : 'mxn',
      receipt_email: token.email,
      customer: customer.id,
      description: 'Gracias por tu compra'
    }, {
      idempotency_key
    }
  );

    console.log("Charge:", {charge});
    status = "success";
  } catch (e) {
    console.error("Error: ", error);
    status = "failure";
  }
  res.json({error, status});
})

// router,get("/secret", (req, res)=>{
//   const paymentIntent = await stripe.paymentIntents.create({
//     payment_method_types: ['card'],
//     amount: 1000,
//     currency: 'usd',
//     application_fee_amount: 123,
//   }, {
//     stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
//   });
//   res.json({client_secret: paymentIntent.client_secret})
// })

router.get("/stripeInfo/:id", async(req, res)=>{
  const info = await Info_Stripe.findOne({where:{id_tienda: req.params.id}});
    return res.json({info: info})
})


module.exports = router;
