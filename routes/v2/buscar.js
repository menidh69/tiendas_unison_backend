const express = require('express');
const router = express.Router();
const {Carrito, Carrito_item, Productos} = require('../../models/entities')

router.get('/producto/search', async (req, res) => {

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

module.exports = router;