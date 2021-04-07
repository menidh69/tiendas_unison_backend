const express = require("express");
const router = express.Router();
var Openpay = require("openpay");
const { OPENPAY_CONFIG } = require("../../config/index");
const {
  Carrito,
  Carrito_item,
  Productos,
  Balance,
  Openpay_Bank_Account,
  Balance,
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

//----------RUTAS PARA CARGOS-------------------

//POST
router.post("/openpay/create_charge", async (req, res) => {
  const user_id = req.body.user_id;
  var nombre_tienda = "";
  //METODO PARA OBTENER PRECIO Y PRODUCTOS
  const items = await Carrito.findAll({
    where: {
      id_usuario: user_id,
    },
    include: {
      model: Carrito_item,
      include: {
        model: Productos,
      },
    },
    raw: true,
  });

  let tiendas = [];
  //Obtiene las diferentes tiendas y las coloca en un array
  await items.map((item) => {
    if (!tiendas.includes(item["carrito_items.producto.id_tienda"]))
      tiendas.push(item["carrito_items.producto.id_tienda"]);
  });
  console.log(tiendas);
  tiendas.map(async (tienda) => {
    //Tienda de productos
    let id_tienda = tienda;

    console.log(id_tienda);
    let total = 0;

    await items.map((item) => {
      if (tienda == item["carrito_items.producto.id_tienda"]) {
        total +=
          item["carrito_items.producto.precio"] *
          item["carrito_items.cantidad"];
      }
    });

    //METODO PARA OBTENER EL CARD_ID
    const openpay_customer = await Openpay_customer.findOne({
      where: {
        id_usuario: user_id,
      },
      raw: true,
    });
    if (!openpay_customer || openpay_customer == "") {
      return res.json({ error: "no tiene tarjetas registradas" });
    }
    //METODO PARA OBTENER USUARIO
    const user = await Usuario.findOne({
      where: {
        id: user_id,
      },
      raw: true,
    });
    console.log(user);
    var chargeRequest = {
      source_id: openpay_customer.card_id,
      method: "card",
      amount: total,
      description: "Compra en College Marketplace a la tienda" + nombre_tienda,
      device_session_id: req.body.device_session_id || "",
    };
    console.log("Antes del charge");
    openpay.customers.charges.create(
      openpay_customer.openpay_id,
      chargeRequest,
      async function (error, charge) {
        console.log("Charge ha iniciado");
        console.log(charge);
        console.log(error);
        if (!error || error == "") {
          const orden = await Orden.create({
            id_usuario: user_id,
            id_tienda: id_tienda,
            fecha: Date.now(),
            entregado: false,
          });
          console.log("Se creo la orden");
          await items.map(async (item) => {
            if (tienda == item["carrito_items.producto.id_tienda"]) {
              let ordenitem = {
                id_orden: orden.id,
                id_producto: item["carrito_items.id_producto"],
                cantidad: item["carrito_items.cantidad"],
              };
              console.log(item);
              const newordenitem = await Ordenitem.create(ordenitem);
              console.log("Se creo el item de orden");
              await Carrito_item.destroy({
                where: {
                  id_carrito: item.id,
                  id_producto: newordenitem.id_producto,
                },
              });
            }
          });

          //METODO PARA CREAR VENTA
          let venta = {
            id_orden: orden.id,
            id_transaccion: charge.id,
            amount: charge.amount,
          };
          await Venta.create(venta);
          console.log("Se creo la venta");
          //METODO PARA ACTUALIZAR BALANCE
          await Balance.increment(
            { balance: +charge.amount - 2 },
            { where: { id_tienda: id_tienda } }
          ).then((new_balance) => {
            console.log("Se actualizo el balance");
            res.json({ orden: orden });
          });
        } else {
          res.json({ error: error });
        }
      }
    );
  });
});

router.post("/openpay/savecard", async (req, res) => {
  await Usuario.findOne({
    where: {
      id: req.body.user_id,
    },
  })
    .then(async (user) => {
      console.log(user);
      await Openpay_customer.findOne({ where: { id_usuario: user.id } })
        .then((found) => {
          if (!found || found == "") {
            var customerRequest = {
              name: req.body.nombre,
              email: req.body.email,
              requires_account: false,
            };

            openpay.customers.create(
              customerRequest,
              function (error, customer) {
                // ...
                if (!error) {
                  var cardRequest = {
                    token_id: req.body.token_id,
                    device_session_id: req.body.device_session_id,
                  };

                  openpay.customers.cards.create(
                    customer.id,
                    cardRequest,
                    function (error, card) {
                      // ...
                      if (!error) {
                        var customer_openpay = {
                          id_usuario: user.id,
                          openpay_id: customer.id,
                          card_id: card.id,
                        };

                        Openpay_customer.create(
                          customer_openpay,
                          function (error, cuenta) {
                            if (!error) {
                              return res.json({ Mensaje: cuenta });
                            } else {
                              return res.json({
                                mensaje: "no se pudo crear el customer",
                                error: error,
                              });
                            }
                          }
                        );
                      } else {
                        return res.json({
                          mensaje: "no se pudo crear el customer de openpay",
                          error: error,
                        });
                      }
                    }
                  );
                } else {
                  return res.json({
                    mensaje: "no se pudo crear la tarjeta",
                    error: error,
                  });
                }
              }
            );
          } else {
            return res.json({ error: "Usted ya tiene registrada una tarjeta" });
          }
        })
        .catch((e) => {
          console.log(e);
          return res.json({
            error: e,
            mensaje: "Ocurrio un error, intente mas tarde",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
});

router.get("/openpay/cards/:id_user", async (req, res) => {
  const tarjeta = await Openpay_customer.findOne({
    where: { id_usuario: req.params.id_user },
  });
  if (!tarjeta || tarjeta == "") {
    return res.json({
      error:
        "ocurrio un error al consultar el error de openpay, intenta mas tarde",
    });
  }
  openpay.customers.cards.get(
    tarjeta.openpay_id,
    tarjeta.card_id,
    function (err, card) {
      if (!err) {
        console.log(card);
        return res.json({ tarjeta: card });
      } else {
        console.log(err);
        return res.json({
          error:
            "ocurrio un error al consultar el error de openpay, intenta mas tarde",
        });
      }
    }
  );
});

router.delete("/openpay/cards/:id_card", async (req, res) => {
  try {
    const card = await Openpay_customer.findOne({
      where: {
        card_id: req.params.id_card,
      },
    });
    if (!card || card == "") {
      return res
        .status(400)
        .json({ error: "No hay nunguna tarjeta guardada con ese id" });
    }
    openpay.customers.delete(card.openpay_id, async function (err) {
      if (!err || err == "") {
        await card.destroy();
        return res.json({ exito: "Eliminado con exito" });
      } else {
        return res
          .status(400)
          .json({ error: "Ocurrio un erro y no se eliminó" });
      }
    });
  } catch (e) {
    return res.status(400).json({ error: "Ocurrio un erro y no se eliminó" });
  }
});

router.post("/openpay/bank_account", async (req, res) => {
  var bankaccountRequest = {
    clabe: req.body.clabe,
    alias: req.body.alias,
    holder_name: req.body.holder_name,
  };

  await Usuario.findOne({
    where: {
      id: req.body.user_id,
      tipo_usuario: "tienda",
    },
  }).then(async (user) => {
    console.log(user);
    if (!user || user == "")
      return res.status(400).json({
        error:
          "Este usuario no tiene permiso a crear cuenta bancaria porque no es una tienda",
      });
    await Openpay_customer.findOne({ where: { id_usuario: user.id } }).then(
      (found) => {
        if (!found || found == "") {
          var customerRequest = {
            name: user.nombre,
            email: user.email,
            requires_account: false,
          };

          openpay.customers.create(customerRequest, function (error, customer) {
            if (!error) {
              openpay.customers.bankaccounts.create(
                customer.id,
                bankaccountRequest,
                async function (error, bankaccount) {
                  if (!error) {
                    await Openpay_customer.create({
                      id_usuario: user.id,
                      openpay_id: customer.id,
                    });
                    const new_bankaccount = {
                      id_tienda: req.body.id_tienda,
                      id_bank_account: bankaccount.id,
                    };
                    await Openpay_Bank_Account.create(new_bankaccount).then(
                      (created) => {
                        return res.json({
                          message: "Exito",
                          bankaccount: bankaccount,
                        });
                      }
                    );
                  } else {
                    return res.json({ error: error });
                  }
                }
              );
            } else {
              return res.json({ error: error });
            }
          });
        } else {
          return res.json({
            error:
              "Ya hay una cuenta bancaria registrada, eliminela y vuelva a crear una",
          });
        }
      }
    );
  });
});

router.get("/openpay/bank_account/:id_tienda", async (req, res) => {
  const datos = await sequelize.query(
    "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
      " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t2.id=" +
      req.params.id_tienda +
      " AND t1.tipo_usuario='tienda",
    { type: QueryTypes.SELECT }
  );
  console.log(datos);
  if (!datos || datos == "")
    return res.json({ error: "No existen registros con esos datos" });
  openpay.customers.bankaccounts.get(
    datos.customer_id,
    datos.id_bank_account,
    function (error, bankaccount) {
      if (!error) {
        return res.json({ bankaccount: bankaccount });
      }
      return res.json({ error: error });
    }
  );
});

router.post("/openpay/payout", async (req, res) => {
  const datos = await sequelize.query(
    "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
      " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t2.id=" +
      req.body.id_tienda +
      " AND t1.tipo_usuario='tienda",
    { type: QueryTypes.SELECT }
  );
  const balance_actual = await Balance.findOne({
    where: { id_tienda: req.body.id_tienda },
  });
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
      destination_id: datos.id_bank_account,
      amount: req.body.amount,
      description: "Retiro de saldo",
      order_id: new_transaccion.id,
    };
    openpay.customers.payouts.create(
      datos.customer_id,
      payoutRequest,
      async function (error, payout) {
        if (!error) {
          balance_actual.balance = balance_actual.balance - req.body.amount;
          await Balance.save();
          return res.json({
            message:
              "Exito al solicitar su retiro, espere 24 horas para ver los cambios reflejados",
            data: payout,
          });
        } else {
          return res.status(400).json({ error: error });
        }
      }
    );
  }
});

module.exports = router;
