const express = require('express');
const router = express.Router();

const stripe = require("stripe")("sk_test_51HmMEiAPtTk1CtqMf6Qa3yUg84j7WmgAeZKGwUfoqNxYZRT7Tbuf3D296sRFX2IQRUtCX3TbamFaVVQTT1Pa7K03001Db91c1X");
const uuid = require("uuid")

router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);
  let error;
  let status;
  try {
    const {product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid();

    const charge = await stripe.charges.create({
      amaount : Number.parseFloat(total).toFixed(2) * 100,
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
