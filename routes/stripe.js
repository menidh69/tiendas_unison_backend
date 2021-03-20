const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid")
const Tienda = require('../models/Tienda');
const Usuario = require('../models/Usuario');
const sgMail = require("@sendgrid/mail");
const Info_Stripe = require('../models/Info_Stripe');
sgMail.setApiKey('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');
const {Carrito, Carrito_item, Productos} = require('../models/entities')
const bodyParser = require("body-parser");
const Stripe_Customer=require('../models/Stripe_Customer')
const webhook_secret = process.env.WEBHOOKSECRET
const Orden = require('../models/Orden')
const Ordenitem = require('../models/OrdenItem')
const Venta = require('../models/Venta')
const Subscripcion_Tienda = require("../models/Subscripcion_Tienda")


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
  const tienda = await Tienda.findOne({where:{id: req.params.id}, include: Info_Stripe, raw:true})
  return res.json({info: tienda})
})

//GET ACCOUNT LINK DE STRIPE CON ID TIENDA
router.get("/stripeInfo/accountLink/:id_tienda", async (req, res)=>{
  const infoStripe = await Info_Stripe.findOne({where:{id_tienda: req.params.id_tienda}})
  if(!infoStripe || ""){
      const account = await stripe.accounts.create({
          type: 'express',
          country: "MX"
        });
        const info = {id_tienda: req.params.id_tienda, id_stripe: account.id}
        const registro = await Info_Stripe.create(info);
        const accountLinks = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: 'https://localhost:3000/',
          return_url: 'https://localhost:3000/',
          type: 'account_onboarding',
          });
          return res.json({status: "success", accountLink: accountLinks, stripe: false, registro: registro})
  
  }else{
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
          return res.json({status: "success", accountLink: accountLinks, stripe: false, id: infoStripe.id_stripe})
  }
}
  
});

router.get("/paySecret/:id_stripe/:id_user", async (req, res)=>{
  // const info = await Info_Stripe.findOne({where:{id_stripe: req.params.id_stripe}})
  // if(!info || info==""){
  //   return res.json({status:"failed", error: "No existe este registro en la bd", id: req.params.id_stripe})
  // }
  const customer_info = await Stripe_Customer.findOne({where:{id_usuario: req.params.id_user}})
  if(!customer_info || customer_info==""){
    return res.json({status:"failed", error: "El usuario no existe", id: req.params.id_stripe})
  }
  const items = await Carrito.findAll({
    where: {
      id_usuario: req.params.id_user
    }, 
    include: {
      model: Carrito_item, 
      include: {
        model: Productos
      }
    }, raw: true
  })

  let tiendas = [];
  
  await items.map(item=>{
    if(!tiendas.includes(item['carrito_items.producto.id_tienda']))
        tiendas.push(item['carrito_items.producto.id_tienda'])
      })
      console.log(tiendas);
      
      const secrets = await Promise.all(tiendas.map(async tienda=>{
      let total=0;
      await items.map(item=>{
        if(tienda==item['carrito_items.producto.id_tienda']){
        total += item['carrito_items.producto.precio']*item['carrito_items.cantidad']
        }
      })
      const infoTienda = await Info_Stripe.findOne({where:{id_tienda: tienda}})
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: total*100,
        currency: 'mxn',
        application_fee_amount: 500,
        customer: customer_info.id_stripe,
        on_behalf_of: infoTienda.id_stripe,
        transfer_data:{
          destination: infoTienda.id_stripe
        }
      });
      console.log(paymentIntent.client_secret)
      return paymentIntent.client_secret
    }));
    console.log(secrets)
        res.json({client_secrets: secrets})
  
});

router.post('/stripe/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  // Verify webhook signature and extract the event.
  // See https://stripe.com/docs/webhooks/signatures for more information.
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, webhook_secret);
  } catch (err) {
    console.log(err)
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    handleSuccessfulPaymentIntent(paymentIntent);
  }

  response.json({received: true});
});

const handleSuccessfulPaymentIntent = async (paymentIntent) => {
  const infoTienda = await Info_Stripe.findOne({where:{id_stripe: paymentIntent.on_behalf_of}, raw:true})
  const infoCliente = await Stripe_Customer.findOne({where:{id_stripe: paymentIntent.customer}, raw:true})
  console.log(infoCliente)
  console.log(infoTienda)
  
  const items = await Carrito.findAll({
    where: {
      id_usuario: infoCliente.id_usuario
    }, 
    include: {
      model: Carrito_item, 
      include: {
        model: Productos, where:{id_tienda: infoTienda.id_tienda}
      }
    }, raw: true
  })
  console.log(items)
    const orden = await Orden.create({
      id_usuario: infoCliente.id_usuario,
      id_tienda: infoTienda.id_tienda,
      fecha: Date.now(), 
      entregado: false
  })
    await items.map(async item=>{
      let ordenitem = {
            id_orden:  orden.id,
            id_producto: item['carrito_items.id_producto'],
            cantidad: item['carrito_items.cantidad'],
          }
          console.log(item)
          const newordenitem = await Ordenitem.create(ordenitem) 
          Carrito_item.destroy({where:{id_carrito: item.id, id_producto: newordenitem.id_producto}})  
    })
    let venta = {
      id_orden: orden.id,
      id_transaccion: paymentIntent.id,
      amount: paymentIntent.amount
    }
    await Venta.create(venta);
    
  
  console.log("success");
  console.log(paymentIntent)
}

router.post('/stripe/create-subscription', async (req, res) => {
  // Attach the payment method to the customer
  let plan = null;
  if(req.body.plan==0){
    plan = false
  }else{
    plan = true
  }
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: 'price_1HrF5VK9hN8J4SbU6bunPrdI' }],
    expand: ['latest_invoice.payment_intent'],
    trial_period_days: 30,
    cancel_at_period_end: plan
  });

  const tienda = await Tienda.findOne({where:{id_usuario: req.body.id_usuario}})
  const registroSub = await Subscripcion_Tienda.create({id_subscripcion: subscription.id, id_tienda: tienda.id})
  await Tienda.update({activo: "true"},{where:{id_usuario: req.body.id_usuario}})
  res.json({subscripcion: subscription, registroSub: registroSub});
});

router.get("/stripe/subscripcion/:id_tienda", async (req, res)=>{
  const subscripcion = await Subscripcion_Tienda.findOne({where:{id_tienda: req.params.id_tienda}})
  if(!subscripcion || subscripcion===null){
    return res.json({status_code: 404, message:"No existe la subscripcion"})
  }
  const stripeData = await stripe.subscriptions.retrieve(
    subscripcion.id_subscripcion
  );
    res.json({subscripcion: stripeData})


})

router.get("/stripe/customer/:id_user", async (req,res)=>{
  const info = await Stripe_Customer.findOne({where:{id_usuario: req.params.id_user}})
  res.json({customer_id: info.id_stripe})
})

module.exports = router;
