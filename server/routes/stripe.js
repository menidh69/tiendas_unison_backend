const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51HmMEiAPtTk1CtqMf6Qa3yUg84j7WmgAeZKGwUfoqNxYZRT7Tbuf3D296sRFX2IQRUtCX3TbamFaVVQTT1Pa7K03001Db91c1X");
const uuid = require("uuid")
const Usuario = require('../models/Usuario');
const sgMail = require("@sendgrid/mail");
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




module.exports = router;
