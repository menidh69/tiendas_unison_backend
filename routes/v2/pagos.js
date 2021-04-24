const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const { SG_MAIL_API } = require("../../config/index");
sgMail.setApiKey(SG_MAIL_API);
const {
  Carrito,
  Carrito_item,
  Productos,
  Balance,
  Venta,
  Tienda,
  Usuario,
} = require("../../models/entities");
const bodyParser = require("body-parser");
const Orden = require("../../models/Orden");
const Ordenitem = require("../../models/OrdenItem");
const {
  sendNotificationNuevaOrden,
} = require("../../controllers/notifications");

router.post("/order", async (req, res) => {
  const id_user = req.body.user;
  const items = await Carrito.findAll({
    where: {
      id_usuario: id_user,
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

  //Iteramos las tiendas
  tiendas.map(async (tienda) => {
    const orden = await Orden.create({
      id_usuario: id_user,
      id_tienda: tienda,
      fecha: Date.now(),
      entregado: false,
    });
    let total = 0;
    //Iteramos en los productos del carrito
    await items.map(async (item) => {
      //Si el id de la tienda == id de la tienda del item del carrito
      if (tienda == item["carrito_items.producto.id_tienda"]) {
        total +=
          item["carrito_items.producto.precio"] *
          item["carrito_items.cantidad"];
      }
      let ordenitem = {
        id_orden: orden.id,
        id_producto: item["carrito_items.id_producto"],
        cantidad: item["carrito_items.cantidad"],
      };
      console.log(item);
      const newordenitem = await Ordenitem.create(ordenitem);
      Carrito_item.destroy({
        where: { id_carrito: item.id, id_producto: newordenitem.id_producto },
      });
    });
    let venta = {
      id_orden: orden.id,
      id_transaccion: null,
      amount: total,
    };
    await Venta.create(venta);
    let BalanceTienda = await Balance.findOne({ where: { id_tienda: tienda } });
    BalanceTienda.balance = BalanceTienda.balance - 2;
    await BalanceTienda.save();
    const usuarioTienda = await Tienda.findOne({
      where: {
        id: tienda,
      },
      include: Usuario,
    });
    console.log(usuarioTienda);
    // sendNotificationNuevaOrden(usuarioTienda.usuario.expoToken);
  });

  return res.json({ message: "La orden creada con exito" });
});

router.post("/order/tarjeta/webhook", async (req, res) => {
  const id_user = req.body.user;
  const items = await Carrito.findAll({
    where: {
      id_usuario: id_user,
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

  //Iteramos las tiendas
  tiendas.map(async (tienda) => {
    const orden = await Orden.create({
      id_usuario: id_user,
      id_tienda: tienda,
      fecha: Date.now(),
      entregado: false,
    });
    let total = 0;
    //Iteramos en los productos del carrito
    await items.map(async (item) => {
      //Si el id de la tienda == id de la tienda del item del carrito
      if (tienda == item["carrito_items.producto.id_tienda"]) {
        total +=
          item["carrito_items.producto.precio"] *
          item["carrito_items.cantidad"];
      }
      let ordenitem = {
        id_orden: orden.id,
        id_producto: item["carrito_items.id_producto"],
        cantidad: item["carrito_items.cantidad"],
      };
      console.log(item);
      const newordenitem = await Ordenitem.create(ordenitem);
      Carrito_item.destroy({
        where: { id_carrito: item.id, id_producto: newordenitem.id_producto },
      });
    });
    let BalanceTienda = await Balance.findOne({ where: { id_tienda: tienda } });
    BalanceTienda.balance = BalanceTienda.balance + total;
    await BalanceTienda.save();
  });
  return res.json({ message: "La orden creada con exito" });
});

module.exports = router;
