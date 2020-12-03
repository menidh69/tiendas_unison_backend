const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const {Productos, Tienda, Usuario, Review_Tienda} = require('../models/entities');
const { Op } = require("sequelize");

//POST NEW REVIEW DE TIENDA
router.post("/reviews/tienda", (req, res)=>{
    const review = {
        calificacion: req.body.rating,
        comentario: req.body.comment,
        id_tienda: req.body.id_tienda,
        id_usuario: req.body.id_usuario
    }
    if(review.calificacion>5){
        return res.json({status: "failed", message: "Invalid rating"})
    }
    Review_Tienda.findOne({where: {id_usuario: req.body.id_usuario, id_tienda: req.body.id_tienda}})
    .then(async found=>{
        if(found=="" || found==null){
            const newReview = await Review_Tienda.create(review)
            res.json({status: "success", review: newReview})
        }else{
            const newReview = await Review_Tienda.update({calificacion: req.body.rating, comentario: req.body.comment},
                {where:{id_usuario: req.body.id_usuario, id_tienda: req.body.id_tienda}})
                res.json({status: "success", review: newReview, message: "Updated"})
        }
    })
    

})

//GET ALL REVIEWS FROM TIENDA
router.get("/reviews/tienda/:id_tienda", (req, res)=>{

})

module.exports = router;