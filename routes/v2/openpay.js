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
  Tienda,
} = require("../../models/entities");
const sendNotification = require("../../controllers/notifications");
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
  const promises = tiendas.map(async (tienda) => {
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
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          const yyyy = today.getFullYear();
          const dateString = yyyy + "-" + mm + "-" + dd;
          const orden = await Orden.create({
            id_usuario: user_id,
            id_tienda: id_tienda,
            fecha: dateString,
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
          ).then(async (new_balance) => {
            console.log("Se actualizo el balance");
            const datosTienda = await Tienda.findOne({
              where: { id: tienda },
              include: Usuario,
            });
            console.log(datosTienda.toJSON());
            return datosTienda.usuario.expoToken;
          });
        } else {
          res.json({ error: error });
        }
      }
    );
  });
  const expoTokens = await Promise.all(promises);
  sendNotification(expoTokens, "Tienes un nuevo pedido pendiente");
  return res.json({ message: "Orden creada con exito" });
});

router.post("/openpay/savecard-w-account", async (req, res) => {
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
              requires_account: true,
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
                    async function (error, card) {
                      // ...
                      if (!error) {
                        var customer_openpay = {
                          id_usuario: user.id,
                          openpay_id: customer.id,
                          card_id: card.id,
                        };

                        await Openpay_customer.create(customer_openpay).then(
                          (created_customer) => {
                            if (!created_customer) {
                              return res.json({
                                mensaje: "no se pudo crear el customer",
                                error: error,
                              });
                            } else {
                              return res.json({ Mensaje: created_customer });
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
                    async function (error, card) {
                      // ...
                      if (!error) {
                        var customer_openpay = {
                          id_usuario: user.id,
                          openpay_id: customer.id,
                          card_id: card.id,
                        };

                        await Openpay_customer.create(customer_openpay).then(
                          (created_customer) => {
                            if (!created_customer) {
                              return res.json({
                                mensaje: "no se pudo crear el customer",
                                error: error,
                              });
                            } else {
                              return res.json({ Mensaje: created_customer });
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
    openpay.customers.cards.delete(
      card.openpay_id,
      card.card_id,
      async function (err) {
        if (!err || err == "") {
          card.card_id = "";
          await card.save();
          return res.json({ exito: "Eliminado con exito" });
        } else {
          return res
            .status(400)
            .json({ error: "Ocurrio un erro y no se eliminó", err: err });
        }
      }
    );
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
          return res.status(400).json({
            error:
              "Para agregar una cuenta bancaria primero hay que registrar una tarjeta",
          });
        } else {
          openpay.customers.bankaccounts.create(
            found.openpay_id,
            bankaccountRequest,
            async function (error, bankaccount) {
              if (!error) {
                const new_bankaccount = {
                  id: bankaccount.id,
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
        }
      }
    );
  });
});

router.delete("/openpay/bank_account/:id_bankaccount", async (req, res) => {
  // openpay.customers.bankaccounts.delete(
  //   "ajiaqdpnhjw1ihi3rni4",
  //   "bms2kcfmnfyhj7lnxcbs",
  //   async function (err) {
  //     if (!err || err == "") {
  //       return res.json({ exito: "Eliminado con exito" });
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ error: "Ocurrio un erro y no se eliminó" });
  //     }
  //   }
  // );

  try {
    const bank = await sequelize
      .query(
        "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
          " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t4.id_bank_account='" +
          req.params.id_bankaccount +
          "' AND t1.tipo_usuario='tienda'",
        { type: QueryTypes.SELECT }
      )
      .then((bankaccount) => {
        console.log(bankaccount);
        if (!bankaccount || bankaccount == "") {
          return res.status(400).json({
            error: "No hay nunguna cuenta bancaria guardada con ese id",
          });
        }
        openpay.customers.bankaccounts.delete(
          bankaccount[0].customer_id,
          bankaccount[0].id_bank_account,
          async function (err) {
            if (!err || err == "") {
              const registro = await Openpay_Bank_Account.findOne({
                where: { id_bank_account: req.params.id_bankaccount },
              });
              await registro.destroy();
              return res.json({ exito: "Eliminado con exito" });
            } else {
              return res.status(400).json({
                error: "Ocurrio un erro y no se eliminó",
                openpay_err: err,
              });
            }
          }
        );
      });
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Ocurrio un erro y no se eliminó", e: e });
  }
});

router.get("/openpay/bank_account/:id_tienda", async (req, res) => {
  const datosBank = await sequelize
    .query(
      "SELECT t3.openpay_id as customer_id, t4.id_bank_account FROM usuario t1" +
        " INNER JOIN tienda t2 ON t1.id=t2.id_usuario INNER JOIN openpay_customer t3 ON t1.id = t3.id_usuario INNER JOIN openpay_bank_account t4 ON t2.id=t4.id_tienda WHERE t2.id='" +
        req.params.id_tienda +
        "' AND t1.tipo_usuario='tienda'",
      { type: QueryTypes.SELECT }
    )
    .then((datos) => {
      console.log(datos);
      if (!datos || datos == "")
        return res.json({ error: "No existen registros con esos datos" });
      openpay.customers.bankaccounts.get(
        datos[0].customer_id,
        datos[0].id_bank_account,
        function (error, bankaccount) {
          if (!error) {
            return res.json({ bankaccount: bankaccount });
          }
          return res.json({ error: error });
        }
      );
    });
});

module.exports = router;
