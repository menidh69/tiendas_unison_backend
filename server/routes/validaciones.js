const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');
const Validar_tienda = require ('../models/Validar_tienda');


router.post("/validar_tienda/:id_usuario/:id_tienda", async (req,res) =>{
    const validar= {
        id_usuario: req.params.id_usuario,
        id_tienda:  req.params.id_tienda
    } 



 Validar_tienda.create(validar)
 .then(Validar_tienda => {
    console.log(validar)
    res.json({status: 'Informe creado con exito' })
 }) 
    
})



module.exports = router;