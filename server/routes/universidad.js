const express = require('express');
const router = express.Router();
const Universidad = require('../models/Universidad');
const UbicacionUni = require('../models/UbicacionUni')


//GET ALL UNIVERSIDADES
router.get("/universidades", async (req, res)=>{
    const todas = await Universidad.findAll(
        {raw: true}
        ).then(result =>{
            res.json(result);
        })
})

//GET ALL UNIVERSIDADES VALIDADAS
router.get("/universidadesvalidadas", async (req, res)=>{
    const todas = await Universidad.findAll(
        {where:{validada: 1},
        raw: true}
        ).then(result =>{
            res.json(result);
        })
});


//POST NUEVA UNIVERSIDAD
router.post("/universidades", async (req, res)=>{
    const uni = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        lat: '0',
        lng: '0',
        validada: "false"
    }
    console.log(uni)
    Universidad.findOne({
        where:{
            nombre: req.body.nombre
        }
    })
    .then(universidad =>{
        if(!universidad){
            Universidad.create(uni)
            .then(universidad=>{
                res.json({mensaje: "universidad creada con exito ", universidad: universidad})
            })
            .catch(err=>{
                console.log(err)

                return res.json({status: "failed",
                error: err})

            })
        }else{
            res.json({ error: "Universidad ya se registró" })
        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
})

//GET UNIVERSIDAD POR ID
router.get("/universidades/:id", async (req, res)=>{
    try{
        const uni = await Universidad.findOne({where: {id: req.params.id}})
        .then(result =>{
            res.json(result);
        })

    }catch(err){
        console.error(err)
    }
})

//PUT VALIDAR UNIVERSIDAD
router.put("/universidades/:id", async (req, res)=>{

    const uni = await Universidad.update({validada: req.body.validada},{where: {id: req.params.id}})
        .then(result=>{
            res.json({status: 'success', universidad:result})
        })
});

//ELIMINAR UNIVERSIDAD
router.delete("/universidades/:id", async (req, res)=>{
    try{
        const deleteUni = await Universidad.destroy({where: {id: req.params.id}})
        .then(result=>{
            res.status(204).json({
                status: "success",
            });
        })
    }catch(err){
        console.error(err)
    }
})

router.get("/universidades/ubi/:id", (req, res)=>{
    UbicacionUni.findOne({where:{id_universidad: req.params.id}, raw:true})
    .then(result=>{
        res.json(result)
    })
    
})

module.exports = router;