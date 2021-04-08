const express = require("express");
const router = express.Router();
const { Carrito, Carrito_item, Productos } = require("../../models/entities");

router.get(
  "/tiendas/:id_tienda/categoria/:nombre_categoria",
  async (req, res) => {
    const categorias = [
      "desayuno",
      "comida",
      "saludable",
      "bebidas",
      "postre",
      "snack",
    ];
    if (categorias.includes(req.params.nombre_categoria)) {
      //Holds value of the query param 'searchquery'.
      const page = 0;
      if (req.query.page) {
        page = req.query.page;
      }
      //Do something when the searchQuery is not null.
      if (page != null) {
        let productos = await Productos.findAll({
          where: {
            id_categoria: categorias.indexOf(req.params.nombre_categoria) + 1,
          },
          offset: 100 * page,
          limit: 100,
        });
        return res.json({ productos: productos });
      } else {
        res.end();
      }
    } else {
      return res.status(400).json({ error: "Esa categoria no existe" });
    }
  }
);

module.exports = router;
