const express = require("express");
const router = express.Router();
const {
  Venta,
  Orden,
  Tienda,
  Ordenitem,
  Productos,
} = require("../models/entities");
const Usuario = require("../models/Usuario");
const sequelize = require("sequelize");
const db = require("../db/db");
const { QueryTypes } = require("sequelize");
const Review_Tienda = require("../models/Review_Tienda");

router.get("/ventas/:id_user", async (req, res) => {
  const tienda = await Tienda.findOne({
    where: { id_usuario: req.params.id_user },
    raw: true,
  });
  const { mes, date, year } = req.query;
  if (mes) {
    const ordenes2 = await db.sequelize.query(
      `SELECT * FROM orden INNER JOIN venta ON orden.id=venta.id_orden WHERE MONTH(orden.fecha)=${mes} && orden.id_tienda=${tienda.id} 
    `,
      { type: QueryTypes.SELECT }
    );
    console.log(ordenes2);
    return res.json({ ventas: ordenes2 });
  }
  if (date) {
    const ordenes2 = await db.sequelize.query(
      `SELECT * FROM orden INNER JOIN venta ON orden.id=venta.id_orden WHERE DATE(orden.fecha)=${date} && orden.id_tienda=${tienda.id} 
        `,
      { type: QueryTypes.SELECT }
    );
    console.log(ordenes2);
    return res.json({ ventas: ordenes2 });
  }
  if (year) {
    const ordenes2 = await db.sequelize.query(
      `SELECT MONTHNAME(orden.fecha) as mes, SUM(amount) as total FROM orden INNER JOIN venta ON orden.id=venta.id_orden WHERE YEAR(orden.fecha)=${year} && orden.id_tienda=${tienda.id} 
      GROUP BY MONTH(orden.fecha) ORDER BY MONTH(orden.fecha)`,
      { type: QueryTypes.SELECT }
    );
    console.log(ordenes2);
    return res.json({ ventas: ordenes2 });
  }
  return res.json({ error: "Especifica un mes o la fecha" });
});

router.get("/compras/cliente/:id_user", async (req, res) => {
  const ordenes = await Orden.findAll({
    where: {
      id_usuario: req.params.id_user,
    },
    include: [
      {
        model: Venta,
      },
      {
        model: Ordenitem,
        include: {
          model: Productos,
          include: {
            model: Tienda,
          },
        },
      },
      { model: Tienda, include: { model: Review_Tienda } },
    ],
  });
  return res.json({ compras: ordenes });
});

module.exports = router;
