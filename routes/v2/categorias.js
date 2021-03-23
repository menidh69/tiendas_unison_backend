const express = require('express');
const router = express.Router();
const {Carrito, Carrito_item, Productos} = require('../../models/entities')

router.get('/productos/postres', async (req, res) => {

    //Holds value of the query param 'searchquery'.
      const searchQuery = req.query.producto;
  
    //Do something when the searchQuery is not null.
    if(searchQuery != null){
        let productos = Productos.findAll({where:{nombre: searchQuery}})
        return res.json({productos: productos})
    }else{
      res.end();
    }
  });

  router.get('/productos/postres', async (req, res) => {

    //Holds value of the query param 'searchquery'.
      const page = req.query.page;
      const categorias = ["postre", "comida", "snack", "saludable", "desayuno", "bebidas"]
  
    //Do something when the searchQuery is not null.
    if(searchQuery != null){
        let productos = Productos.findAll({where:{categoria: "1"}, offset: 10*page, limit: 10 })
        return res.json({productos: productos})
    }else{
      res.end();
    }
  });

module.exports = router;