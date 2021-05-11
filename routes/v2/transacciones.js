const express = require("express");
const router = express.Router();
var Openpay = require("openpay");
const { OPENPAY_CONFIG } = require("../../config/index");
const { sequelize } = require("../../db/db");
const { QueryTypes } = require("sequelize");
const {
  Carrito,
  Carrito_item,
  Productos,
  Balance,
  Openpay_Bank_Account,
  Transaccion,
} = require("../../models/entities");
const Usuario = require("../../models/Usuario");
const openpay = new Openpay(
  OPENPAY_CONFIG.OPENPAY_ID,
  OPENPAY_CONFIG.OPENPAY_PRIVATE_KEY,
  false
);
const Orden = require("../../models/Orden");
const Ordenitem = require("../../models/OrdenItem");
const Venta = require("../../models/Venta");
const Openpay_customer = require("../../models/Openpay_customer");
const { route } = require("../ventas");
//RUTAS PARA GUARDAR TARJETA

router.post("/openpay/payout", async (req, res) => {
  const datosBank = await sequelize
    .query(
      "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
        " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t2.id='" +
        req.body.id_tienda +
        "' AND t1.tipo_usuario='tienda'",
      { type: QueryTypes.SELECT }
    )
    .then(async (datos) => {
      if (!datos || datos == "") {
        return res
          .status(400)
          .json({ error: "Aun no ha registrado una cuenta bancaria" });
      }
      const balance_actual = await Balance.findOne({
        where: { id_tienda: req.body.id_tienda },
      });
      console.log(datos);
      if (balance_actual.balance < 100) {
        return res.status(400).json({
          error:
            "Usted no tiene fondos suficientes, el retiro minimo es de 100 pesos",
        });
      } else {
        if (req.body.amount < 100)
          return res
            .status(400)
            .json({ error: "No puedo retirar menos de 100 pesos" });
        const new_transaccion = await Transaccion.create({
          timestamp: Date.now(),
          id_tienda: req.body.id_tienda,
          monto: req.body.amount,
        });
        var payoutRequest = {
          method: "bank_account",
          destination_id: datos[0].id_bank_account,
          amount: req.body.amount,
          description: "Retiro de saldo",
          order_id: new_transaccion.id,
        };
        openpay.customers.payouts.create(
          datos[0].customer_id,
          payoutRequest,
          async function (error, payout) {
            if (error) {
              return res.status(400).json({ error: error });
            } else {
              balance_actual.balance = balance_actual.balance - req.body.amount;
              await balance_actual.save();
              return res.json({
                message:
                  "Exito al solicitar su retiro, espere 24 horas para ver los cambios reflejados",
                data: payout,
              });
            }
          }
        );
      }
    });
});

router.get("/openpay/tienda/:id_tienda/retiros", async (req, res) => {
  const datosBank = await sequelize
    .query(
      "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
        " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t2.id='" +
        req.params.id_tienda +
        "' AND t1.tipo_usuario='tienda'",
      { type: QueryTypes.SELECT }
    )
    .then(async (datos) => {
      console.log(datos);
      if (!datos || datos == "") {
        return res
          .status(400)
          .json({ error: "Aun no ha registrado una cuenta bancaria" });
      }
      searchParams = {
        limit: 10,
      };

      openpay.customers.payouts.list(
        datos[0].customer_id,
        searchParams,
        function (error, list) {
          if (error) {
            return res.status(400).json({ error: error });
          }
          return res.json({ datos: list });
        }
      );
    });
});

router.post("/openpay&payout/test", (req,res)=>{
  var payoutRequest = {
    'method':'bank_account',
    'bank_account':{
       'clabe':'012298026516924616',
       'holder_name':'Mi empresa'
    },
    'amount':10.50,
    'description':'Retiro de saldo semanal',
    'order_id':'oid-1110011'
 };
  openpay.customers.payouts.create('ag4nktpdzebjiye1tlze', payoutRequest, function(error, payout) {
    // ...
  });
})

module.exports = router;
