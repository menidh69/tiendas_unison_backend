const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const Info_bancaria = require("../models/Info_bancaria");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const { SG_MAIL_API } = require("../config/index");
sgMail.setApiKey(SG_MAIL_API);
const Carrito_item = require("../models/CarritoItem");
const Carrito = require("../models/Carrito");
const Info_Stripe = require("../models/Info_Stripe");
const Productos = require("../models/Productos");
const { sequelize } = require("../db/db");
const Tienda = require("../models/Tienda");
const entities = require("../models/entities");
const Stripe_Customer = require("../models/Stripe_Customer");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Review = require("../models/Review");
const { QueryTypes } = require("sequelize");

router.post("/usuarios", async (req, res) => {
  console.log(req.body);
  const user = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    contra: req.body.contraseña,
    tel: req.body.telefono,
    id_universidad: req.body.universidad || req.body.id_universidad,
  };

  console.log(user);
  Usuario.findOne({
    where: {
      email: user.email,
    },
  })
    .then((usuario) => {
      if (!usuario) {
        bcrypt.hash(req.body.contraseña, 10, (err, hash) => {
          user.contra = hash;
          Usuario.create(user)
            .then(async (usuario) => {
              const cart = {
                id_usuario: usuario.id,
              };
              Carrito.create(cart);
              res.json({ message: usuario.email + " registrado con exito" });
              const msg = {
                to: user.email,
                from: "tiendasunisonweb@gmail.com",
                subject: "Registro a Tiendas Universitarias",
                text: "Bienvenida",
                html:
                  "<h1>Espero y la pases bomba y te guste la pagina bye</h1>",
              };
              sgMail.send(msg);
            })
            .catch((err) => {
              res.status(400).json("message: " + err);
            });
        });
      } else {
        res
          .status(400)
          .json({ message: "Ya existe un usuario con esa cuenta" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

//GET USUARIO POR EMAIL
router.get("/usuarios/:email", async (req, res) => {
  try {
    const user = await Usuario.findOne({
      where: { email: req.params.email },
    }).then((result) => {
      res.json(result);
      status: "ok";
    });
  } catch (err) {
    console.error(err);
  }
  /*Usuario.findOne({ //eso es lo del video  necesita agregar const jwt=require)'jsonwebtoken' y process.env.SECRET_KEY = 'secret'
      where: {
        email: req.body.email
      }
    })
    .then(usuario => {
      if (usuario) {
        if (bcrypt.compareSync(req.body.contra, usuario.contra)) {
          let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      }else{
        res.status(400).json({error: 'Usuario no existe'})
      }
    })
    .catch(err => {
      res.status(400).json({error:err})
    })*/
});

router.delete("/usuarios/:id", async (req, res) => {
  try {
    const deleteUsuario = await Universidad.destroy({
      where: { id: req.params.id },
    }).then((result) => {
      res.status(204).json({
        status: "success",
      });
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/usuarioinfo/:id", async (req, res) => {
  try {
    const user = await Usuario.findAll({ where: { id: req.params.id } }).then(
      (result) => {
        //console.log(result);
        res.json(result);
        //console.log(res.json(result));
      }
    );
  } catch (err) {
    console.error(err);
    console.log(err);
  }
});

//CARRITO

// Productos.hasMany(Carrito_item, {as: 'producto', foreignKey: 'id_producto'});
// Carrito_item.belongsTo(Productos, {foreignKey: 'id'});

router.get("/carrito/:id", async (req, res) => {
  try {
    const carrito = await Carrito.findAll({
      where: { id_usuario: req.params.id },
    })
    .then((result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/carritoCrear/:id", async (req, res) => {
  try {
    const c = {
      id_usuario: req.params.id,
    };
    const crear = await Carrito.create(c)
    .then((result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Carrito_item.hasOne(Productos, {as: 'id_producto', foreignKey:'id'})

router.get("/carrito/:id/items", async (req, res) => {
  try {
    const Carrito = await entities.Carrito.findOne({
      where: { id_usuario: req.params.id },
      include: {
        model: entities.Carrito_item,
        include: {
          model: entities.Productos,
          include: {
            model: Tienda,
          },
        },
      },
    })
      // const carritoItem = await Carrito_item.findAll({
      // include: [
      //   {model: entities.Productos}
      // ],
      // where: {id_carrito: req.params.id}})
      // const carritoItem = await sequelize.query("SELECT carrito_item.id, carrito_item.id_producto, carrito_item.cantidad, productos.nombre, productos.precio, productos.id_tienda, tienda.nombre as tienda_nombre FROM carrito_item INNER JOIN productos ON carrito_item.id_producto = productos.id INNER JOIN tienda ON productos.id_tienda = tienda.id WHERE id_carrito = " + req.params.id)
      // console.log(carritoItem)
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/carrito/payment/:id_usuario", async (req, res) => {
  try {
    const carritoInfo = await entities.Carrito.findAll({
      where: {
        id_usuario: req.params.id_usuario,
      },
      include: {
        model: entities.Carrito_item,
        include: {
          model: entities.Productos,
          include: {
            model: Tienda,
          },
        },
      },
    });

    res.json({ result: carritoInfo });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/carrito/items/:id", async (req, res) => {
  Carrito_item.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json(result);
  });
});

//router.get("/carritoItems")

router.post("/carrito/agregar", async (req, res) => {
  const carrito = await Carrito.findOne({
    where: { id_usuario: req.body.id_user },
    raw: true,
  });
  const item = {
    id_producto: req.body.id_producto,
    cantidad: req.body.cantidad,
    id_carrito: carrito.id,
  };

  const itemExiste = await Carrito_item.findOne({
    where: {
      id_carrito: carrito.id,
      id_producto: item.id_producto,
    },
    raw: true,
  });
  console.log(itemExiste);
  if (!itemExiste || itemExiste == "") {
    const newItem = await Carrito_item.create(item);
    return res.json({ status: "success", item: newItem });
  } else {
    const cantidad = Number(itemExiste.cantidad) + Number(item.cantidad);
    const updated = await Carrito_item.update(
      { cantidad: cantidad },
      {
        where: {
          id_carrito: itemExiste.id_carrito,
          id_producto: itemExiste.id_producto,
        },
      }
    );
    return res.json({ status: "updated", item: updated });
  }
});

//AQUI TERMINA LO DEL CARRITO

//info usuario e info bancaria
router.get("/usuarioinfoperfil/:id", async (req, res) => {
  try {
    const user = await Usuario.findAll({
      where: { id: req.params.id },
      include: Info_bancaria,
      raw: true,
    }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
    console.log(err);
  }
});

//PUT nueva info en usuario
router.put("/usuarios/:id", async (req, res) => {
  const user = await Usuario.update(
    {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      tel: req.body.tel,
    },
    { where: { id: req.params.id } }
  ).then((result) => {
    res.json({ status: "success", Usuario: result });
  });
});

//BORRAR Usuario
router.delete("/usuariosdelete/:id", async (req, res) => {
  try {
    const deleteUsuario = await Usuario.destroy({
      where: { id: req.params.id },
    }).then((result) => {
      res.status(204).json({
        status: "success",
      });
    });
  } catch (err) {
    console.error(err);
  }
});
//GET ordenes no completadas usuario
router.get("/usuarios/pedidosPendientes/:id_usuario", async (req, res) => {
  const ordenes = await sequelize.query(
    "SELECT t1.id AS orden_id, t1.fecha, t1.id_tienda, t4.nombre AS nombre_tienda, t2.cantidad, t3.nombre, t3.precio, t3.url_imagen FROM orden t1" +
      " INNER JOIN orden_item t2 ON t1.id=t2.id_orden INNER JOIN productos t3 ON t2.id_producto = t3.id INNER JOIN tienda t4 ON t1.id_tienda=t4.id WHERE t1.id_usuario=" +
      req.params.id_usuario +
      " AND t1.entregado=false",
    { type: QueryTypes.SELECT }
  );
  return res.json({ result: ordenes });
});
//GET ordenes completadas usuario
router.get("/usuarios/pedidos/entregado/:id_usuario", async (req, res) => {
  const ordenes = await sequelize.query(
    "SELECT t1.id AS orden_id, t1.fecha, t1.id_tienda, t4.nombre AS nombre_tienda, t2.cantidad, t3.nombre, t3.precio, t3.url_imagen FROM orden t1" +
      " INNER JOIN orden_item t2 ON t1.id=t2.id_orden INNER JOIN productos t3 ON t2.id_producto = t3.id INNER JOIN tienda t4 ON t1.id_tienda=t4.id WHERE t1.id_usuario=" +
      req.params.id_usuario +
      " AND t1.entregado=true",
    { type: QueryTypes.SELECT }
  );
  return res.json({ result: ordenes });
});

//GET ordenes no completadas usuario
router.get("/usuarios/pedidos/:id_usuario", async (req, res) => {
  try {
    const pedidos = await entities.Orden.findAll({
      where: {
        id_usuario: req.params.id_usuario,
        entregado: 0,
      },
      include: [
        {
          model: entities.Usuario,
        },
        {
          model: entities.Tienda,
        },
        {
          model: entities.Ordenitem,
          include: {
            model: entities.Productos,
          },
        },
      ],
    });

    res.json({ result: pedidos });
  } catch (error) {
    console.log(error);
  }
});

router.post("/usuarios/calificar/:id_producto", async (req, res) => {
  try {
    const calificar = {
      id_producto: req.params.id_producto,
      id_usuario: req.body.id_usuario,
      calificacion: req.body.calificacion,
      comentario: req.body.comentario,
    };

    Review.create(calificar).then((review) => {
      res.json({ status: review.id + "producto calificado con exito" });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/usuarios/calificacion/:id_producto/:id_usuario",
  async (req, res) => {
    try {
      const calificacion = await Review.findOne({
        where: {
          id_producto: req.params.id_producto,
          id_usuario: req.params.id_usuario,
        },
      });

      res.json({ result: calificacion });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/usuarios/calificarEditar/:id_producto", async (req, res) => {
  try {
    Review.update(
      { calificacion: req.body.calificacion, comentario: req.body.comentario },
      {
        where: {
          id_producto: req.params.id_producto,
          id_usuario: req.body.id_usuario,
        },
      }
    ).then((review) => {
      res.json({ status: review.id + "producto editado calificado con exito" });
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
