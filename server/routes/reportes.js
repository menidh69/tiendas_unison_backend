const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');
const Reporte_tienda = require ('../models/Reporte_tienda');


router.post("/reporte_tienda/:id_usuario/:id_tienda", async (req,res) =>{
    const reportar= {
        id_usuario: req.params.id_usuario,
        id_tienda:  req.params.id_tienda
    } 



 Reporte_tienda.create(reportar)
 .then(Reporte_tienda => {
    console.log(reportar)
    res.json({status: 'Reporte creado con exito' })
 }) 
    
})




module.exports = router;