const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const Universidad = require('./models/Universidad');
const Usuario = require('./models/Usuario');
const Tienda = require('./models/Tienda');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const app = express()
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');
//  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


app.use(cors());
app.use(bodyParser.json()) //req.body
app.use(bodyParser.urlencoded({extended: false}))




app.get('/', (req,res)=>{
    res.send('Hola')
})




//ROUTES


//----------------------------------------------------------
//----------------USUARIOS-----------------------------------
//----------------------------------------------------------

//POST NUEVO USUARIO
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
            email: req.body.email
        }
    })
    .then(usuario =>{
        if(!usuario){
            bcrypt.hash(req.body.contra, 10, (err, hash) => {
              user.contra = hash
              Usuario.create(user)
              .then(usuario=> {
                res.json({status: usuario.email + ' registrado con exito'})  
                const msg ={
                    to: user.email,
                    from: "tiendasuniv@hotmail.com",
                    subject: "Registro a Tiendas Universitarias",
                    text: "Bienvenida",
                    html: "<h1>Espero y la pases bomba y te guste la pagina bye</h1>",
                }
                sgMail.send(msg);
              })
              .catch(err=>{
                res.send('error: ' + err)
              })
            })
        }else{
            res.json({ error: "Ya existe un usuario con esa cuenta" })  
        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
})

//GET USUARIO POR EMAIL
app.get("/api/v1/usuario/:email", async (req, res)=>{
  try{
      const user = await Usuario.findOne({where:{email: req.params.email}})
      .then(result =>{
          res.json(result);
          status: "ok"
      })

  }catch(err){
      console.error(err)
  }
    /*Usuario.findOne({ //eso es lo del video  necesita agregar const jwt=require)'jsonwebtoken' y process.env.SECRET_KEY = 'secret'
      where: {
        email: req.body.email
      }
    })
    .then(usuario => {
      if (usuario) {
        if (bcrypt.compareSync(req.body.contra, usuario.contra)) {
          let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      }else{
        res.status(400).json({error: 'Usuario no existe'})
      }
    })
    .catch(err => {
      res.status(400).json({error:err})
    })*/
})

//POST USUARIO LOGIN
app.post("/api/v1/usuario/login", async (req, res)=>{
    Usuario.findOne({
        where:{
            email: req.body.email 
        } 
        
    })
    .then (user => {
        if (!user) {
            return res.status(401).json({
                message: 'Usuario no existe'
            });
        }
        bcrypt.compare(req.body.contra, user.contra).then ((result) => {
            console.log(result)
            if(!result) return res.status(400).json({message: 'Invalid credentials'});
            jwt.sign(
                {id: user.id},
                'secretosupersecreto', //ESTE SECRETO DEBERA GUARDARSE EN ARCHIVO DE CONGIFURACION DESPUES
                {expiresIn: 3600},
                (err, token) =>{
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            nombre: user.nombre,
                            email: user.email,
                            tipo: user.tipo_usuario
                        }
                    })
                }
            )
            
            // if (result) {
            //     return res.status(200).json({
            //         message: 'we did it'
            //     })
            // }else {
            //     res.status(404).json({
            //         message: 'fallo bro',
            //     })
            // }
            
        });
        
        // bcrypt.hash(req.body.contra, 10, function(err,hash) {
        //     if(err) {
        //         throw (err);
        //     }
        //     console.log(user.contra)
        //     console.log(req.body.contra)
        //     console.log(hash)
        //     bcrypt.compare(req.body.contra, user.contra).then((result) => {
        //         console.log(result)
        //         if (result) {
        //             return res.status(200).json({
        //                 message: 'Auth succesful'
        //             })
        //         } else {
        //             res.status(404).json({
        //                 message: 'fallobrother'
        //             })
        //         }
        //     })
        // })
        
    })

    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
      
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
})
// OLVIDAR CONTRASEÑA
// nuevo ??? 

app.post("/olvidarcontra",(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
               return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                const msg ={
                    to: user.email,
                    from: "tiendasuniv@hotmail.com",
                    subject: "olvida contras",
                    text: "Bienvenida",
                    html: "<h1>lo siento bye </h1>",
                }
                sgMail.send(msg);
              })
            })

        })
    })




/* app.post('/new-password',(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   Usuario.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Try again session expired"})
       }
       bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })
       })
   }).catch(err=>{
       console.log(err)
   })
}) */

//----------------------------------------------------------
//----------------------------------------------------------

//----------------------------------------------------------
//----------------TIENDAS-----------------------------------
//----------------------------------------------------------

app.post("/api/v1/tienda", async (req, res)=>{
    const tienda = {
        id_usuario: '',
        id_tipo_tienda: req.body.id_tipo_tienda,
        nombre: req.body.nombretienda,
        horario: req.body.horario,
        url_imagen: '',
        tarjeta: req.body.tarjeta
    }
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contra: req.body.contra,
        tel: req.body.tel,
        universidad: req.body.universidad,
        tipo_usuario: 'tienda'
    }
    Usuario.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(async usuario =>{
        if(!usuario){
            await bcrypt.hash(req.body.contra, 10, async (err, hash) => {
              user.contra = hash
              await Usuario.create(user)
              .then(async usuario=> {
                tienda.id_usuario = usuario.id
                await Tienda.create(tienda)
                .then(async tiendacreada=>{
                    res.json({
                        status: tiendacreada.nombre + ': Tienda y usuario creada con exito'
                    })
                })
                .catch(err=>{
                    res.json({
                        status: 'Ocurrio un error al crear la tienda, vuelve a intentarlo'}
                        )
                })
              }).catch(err=>{
                res.status(204).json({'error: ': err})
              })
            
            })
        }else{
            res.json({ error: "Ya existe un usuario con esa cuenta" })  
        }
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
})

//----------------------------------------------------------
//----------------------------------------------------------

//----------------------------------------------------------
//----------------UNIVERSIDAD--------------------------------
//----------------------------------------------------------

//GET ALL UNIVERSIDADES
app.get("/api/v1/universidades", async (req, res)=>{
    const todas = await Universidad.findAll(
        {raw: true}
        ).then(result =>{
            res.json(result);
        })
})


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
})

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
})

//-----------------------------------------------
//----------------------------------------------------------
app.listen(5000, ()=>{
    console.log('Server is running')
})
