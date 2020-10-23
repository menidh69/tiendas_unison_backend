const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const Productos = require('../models/Productos');

router.get("/productosTienda/:id", async (req, res)=>{
    
    const todas = await Productos.findAll(
        {
        where:{
            id_tienda: req.params.id
        }})
    .then(result => {
        res.json(result)
    })
})

router.get("/productosTienda/:idTienda/:idProducto", async (req, res)=>{
    
    const todas = await Productos.findAll(
        {
        where:{
            id: req.params.idProducto,
            id_tienda: req.params.idTienda
        }})
    .then(result => {
        res.json(result)
    })
})

router.delete("/eliminarProducto/:idProducto/:idTienda", async (req, res)=>{
    
    Productos.destroy({where:{
        id: req.params.idProducto,
        id_tienda: req.params.idTienda
    }})
    .then(result => {
        res.json(result)
    })
})

router.put("/editarProducto/:id", async (req, res)=>{


    const uni = await Productos.update({
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion
        },{where: {id: req.params.id, id_tienda: req.body.id_tienda}})

        .then(result=>{
            console.log(result)
            res.json({status: 'success'})
        })

})

router.post("/nuevoProducto", async (req, res)=>{

    const producto = {
        nombre: req.body.nombre,
        id_tienda: req.body.id_tienda,
        precio: req.body.precio,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion
    }

    
    Productos.create(producto)
    .then(producto => {
        res.json({status: producto.nombre + ' registrado con exito'})
    })
})

module.exports = router;