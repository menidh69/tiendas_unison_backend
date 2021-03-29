const express = require("express");
const router = express.Router();
var Openpay = require("openpay");
const { OPENPAY_CONFIG } = require("../../config/index");
const {
  Carrito,
  Carrito_item,
  Productos,
  Balance,
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

module.exports = router;
