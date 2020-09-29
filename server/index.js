const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const Universidad = require('./models/Universidad');
const Usuario = require('./models/Usuario');
const app = express()

app.use(cors());
app.use(bodyParser.json()) //req.body
app.use(bodyParser.urlencoded({extended: false}))




app.get('/', (req,res)=>{
    res.send('Hola')
})




//ROUTES

//----------------USUARIOS-----------------------------------
//POST NUEVO USUARIO
app.post("/api/v1/usuario", async (req, res)=>{
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        universidad: req.body.universidad
    }
    Usuario.findOne({
        where:{
            nombre: req.body.nombre
        }
    })
    .then(usuario =>{
        if(!usuario){
            Usuario.create(user)
            .then(usuario=>{
                res.json({status: usuario.nombre + ' registrado con exito'})
            })
            .catch(err=>{
                res.send('error: ' + err)
            })
        }else{
            res.json({ error: "Usuario registrado" })
        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
});

//GET USUARIO POR EMAIL
app.get("/api/v1/usuario/:email", async (req, res)=>{
    try{
        const user = await Usuario.findAll({where: {email: req.params.email, contra:req.params.contra}})
        .then(result =>{
            res.json(result);
        })

    }catch(err){
        console.error(err)
    }
})


//ELIMINAR USUARIO
app.delete("/api/v1/usuario/:id", async (req, res)=>{
    try{
        const deleteUsuario = await Universidad.destroy({where: {id: req.params.id}})
        .then(result=>{
            res.status(204).json({
                status: "success",
            });
        })
    }catch(err){
        console.error(err)
    }
});

//----------------------------------------------------------
//----------------TIENDAS-----------------------------------



//----------------------------------------------------------
//----------------UNIVERSIDAD--------------------------------

//GET ALL UNIVERSIDADES
app.get("/api/v1/universidades", async (req, res)=>{
    const todas = await Universidad.findAll(
        {raw: true}
        ).then(result =>{
            res.json(result);
        })
});


//POST NUEVA UNIVERSIDAD
app.post("/api/v1/universidades", async (req, res)=>{
    const uni = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        validada: "false"
    }
    Universidad.findOne({
        where:{
            nombre: req.body.nombre
        }
    })
    .then(universidad =>{
        if(!universidad){
            Universidad.create(uni)
            .then(universidad=>{
                res.json({status: universidad.nombre + ' registrado con exito'})
            })
            .catch(err=>{
                res.send('error: ' + err)
            })
        }else{
            res.json({ error: "Universidad ya se registró" })
        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
});

//GET UNIVERSIDAD POR ID
app.get("/api/v1/universidades/:id", async (req, res)=>{
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
app.put("/api/v1/universidades/:id", async (req, res)=>{

    const uni = await Universidad.update({validada: req.body.validada},{where: {id: req.params.id}})
        .then(result=>{
            res.json({status: 'success', universidad:result})
        })
});

//ELIMINAR UNIVERSIDAD
app.delete("/api/v1/universidades/:id", async (req, res)=>{
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
});

app.listen(5000, ()=>{
    console.log('Server is running')
})
