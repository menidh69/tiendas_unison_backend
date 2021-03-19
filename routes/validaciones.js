const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Tienda = require('../models/Tienda');
const Validar_tienda = require ('../models/Validar_tienda');


router.post("/validar_tienda", async (req,res) =>{
    const validar= {
        id_usuario: req.body.id_usuario,
        id_tienda:  req.body.id_tienda,
        verificada: req.body.verificada
    } 

Validar_tienda.findOne({where:{id_usuario: req.body.id_usuario, id_tienda: req.body.id_tienda}})
.then(found=>{
    if(!found || found==''){
        Validar_tienda.create(validar)
            .then(validacion => {
                console.log(validar)
                Validar_tienda.count(
                    {
                        where:{id_tienda: req.body.id_tienda}
                    })
                    .then(result=>{
                        console.log(result.count)
                        console.log(result.rows)
                        console.log(result)
                        if(result>5){
                            Tienda.findOne({where:{id: req.body.id_tienda}})
                            .then(tienda=>{
                                tienda.validada = 'true';
                                tienda.save()
                                return res.json({status: 'Tienda verificada', verificada: 'true' })
                            })
                        }
                    })
                res.json({status: 'Informe creado con exito', verificada: 'false' })
            })
        }else{
            res.json({status:'Repetido'})
    }
})

 
 }) 
 

router.get("/validar_tienda/:id_usuario/tiendas/:id_tienda", (req, res)=>{
    Validar_tienda.findOne({where:{id_usuario: req.params.id_usuario, id_tienda: req.params.id_tienda, verificada: "true"}})
    .then(validacion=>{
        if(!validacion || validacion==''){
            console.log('false')
            return res.json({status: 'false'});

        }
        console.log('true')
        res.json({status: 'true'})
    })
})


module.exports = router;