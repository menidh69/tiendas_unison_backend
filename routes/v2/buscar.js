const express = require("express");
const router = express.Router();
const { Carrito, Carrito_item, Productos } = require("../../models/entities");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/producto/search", async (req, res) => {
  //Holds value of the query param 'searchquery'.
  const searchQuery = req.query.producto;

  //Do something when the searchQuery is not null.
  if (searchQuery != null) {
    let productos = await Productos.findAll({
      where: {
        nombre: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
      limit: 25,
    });
    return res.json({ productos: productos });
  } else {
    res.end();
  }
});

module.exports = router;
