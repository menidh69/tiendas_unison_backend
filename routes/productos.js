const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const { Productos, Tienda, Usuario } = require("../models/entities");
const { Op } = require("sequelize");
const entities = require("../models/entities");
const Categoria = require("../models/Categoria");

router.get("/productosTienda/:id", async (req, res) => {
  const todas = await entities.Productos.findAll({
    where: {
      id_tienda: req.params.id,
    },
    include: {
      model: entities.Review,
    },
  }).then((result) => {
    res.json(result);
  });
});

router.get("/productosTienda/:idTienda/:idProducto", async (req, res) => {
  const todas = await Productos.findAll({
    where: {
      id: req.params.idProducto,
      id_tienda: req.params.idTienda,
    },
  }).then((result) => {
    res.json(result);
  });
});

router.delete("/eliminarProducto/:idProducto/:idTienda", async (req, res) => {
  Productos.destroy({
    where: {
      id: req.params.idProducto,
      id_tienda: req.params.idTienda,
    },
  }).then((result) => {
    res.json(result);
  });
});

router.put("/editarProducto/:id", async (req, res) => {
  const uni = await Productos.update(
    {
      nombre: req.body.nombre,
      precio: req.body.precio,
      id_categoria: req.body.id_categoria,
      url_imagen: req.body.url_imagen,
      descripcion: req.body.descripcion,
    },
    { where: { id: req.params.id, id_tienda: req.body.id_tienda } }
  ).then((result) => {
    console.log(result);
    res.json({ status: "success" });
  });
});

router.post("/nuevoProducto", async (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    id_tienda: req.body.id_tienda,
    precio: req.body.precio,
    id_categoria: req.body.id_categoria || null,
    url_imagen: req.body.url_imagen || "",
    descripcion: req.body.descripcion,
  };

  Productos.create(producto).then((producto) => {
    res.json({ status: producto.nombre + " registrado con exito" });
  });
});

router.get("/categorias", async (req, res) => {
  const categorias = await Categoria.findAll();
  return res.json({ categorias: categorias });
});

//No funciona, error desconocido
router.get(
  "/universidad/:id_universidad/productos/:nombre",
  async (req, res) => {
    const items = await Productos.findAll({
      where: { [Op.like]: "%" + req.params.nombre },
      include: {
        model: Tienda,
        include: {
          model: Usuario,
          where: { id_universidad: req.params.id_universidad },
        },
      },
    });
    res.json({ productos: items });
  }
);

module.exports = router;
