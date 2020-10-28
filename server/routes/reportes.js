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
 .then(reporte => {
    console.log(reportar)
    Reporte_tienda.count(
        {
            where:{id_tienda: req.params.id_tienda}
        })
        .then(result=>{
            console.log(result.count)
            console.log(result.rows)
            console.log(result)
            if(result>5){
                Tienda.findOne({where:{id: req.params.id_tienda}})
                .then(tienda=>{
                    tienda.activo = 'false';
                    tienda.save()
                    return res.json({status: 'Tienda verificada', verificada: 'true' })
                })
            }
        })

    res.json({status: 'Reporte creado con exito' })
 }) .catch(e=>{
    res.json({error: e})
 })


    
})

router.get("/reporte_tienda", (req,res)=>{
    Tienda.findAll(
        { 
            include: Reporte_tienda
           
    })
    .then(cantidad=>{
        console.log(cantidad)
        return res.json({result: cantidad})
    })
})

router.get("/reporte_tienda/universidad/:id_universidad", async(req,res)=>{
        const todas = await Usuario.findAll(
            {
            where:{
                id_universidad: req.params.id_universidad,
                tipo_usuario: 'tienda'
            }, include: [
                {
                    model: Tienda, include: [{model: Reporte_tienda}]
                }
            ]})
        .then(result => {
            console.log(result)
            res.json(result)
        })
    })

router.get("/reporte_tienda/:id_tienda", (req,res)=>{
    Tienda.findAll(
        {
            where:{id: req.params.id_tienda}, 
            include: Reporte_tienda
           
    })
    .then(cantidad=>{
        console.log(cantidad)
        return res.json({result: cantidad})
    })
})

router.get("/reporte_tienda/usuario/:id_usuario", (req,res)=>{
    Usuario.findAll(
        {
            where:{id: req.params.id_usuario}, 
            include: [
                {
                    model: Tienda, include: [{model: Reporte_tienda}]
                }
            ]
           
    })
    .then(cantidad=>{
        console.log(cantidad)
        return res.json({result: cantidad})
    })
})

router.delete("/reporte_tienda/all/:id_tienda", async (req, res)=>{
    const reportes = await Reporte_tienda.destroy({where:{id_tienda: req.params.id_tienda}})
    .then(resp=>{
        res.json({status: "Eliminados con exito"})
    })
    .catch(e=>{
        res.json({status: "Ocurrió un erro"})
    })
})

router.delete("/reporte_tienda/:id", async (req, res)=>{
    const reportes = await Reporte_tienda.destroy({where:{id: req.params.id}})
    .then(resp=>{
        res.json({status: "Eliminado con exito"})
    })
    .catch(e=>{
        res.json({status: "Ocurrió un erro"})
    })
})


module.exports = router;