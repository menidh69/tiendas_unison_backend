const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const sgMail = require("@sendgrid/mail");
const moment = require('moment')
sgMail.setApiKey('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');
const tiendasRoutes = require('./routes/tiendas')
const usuarioRoutes = require('./routes/usuario')
const productosRoutes = require('./routes/productos')
const universidadRoutes = require('./routes/universidad')
const reportesRoutes = require('./routes/reportes')
const validacionesRoutes = require('./routes/validaciones')
const authRoutes = require('./routes/auth')


app.use(cors());
app.use(bodyParser.json()) //req.body
app.use(bodyParser.urlencoded({extended: false}))
moment().format();

app.get('/', (req,res)=>{
    res.send('Hola')
})

app.use("/api/v1", productosRoutes);
app.use("/api/v1", usuarioRoutes);
app.use("/api/v1", tiendasRoutes);
app.use("/api/v1", universidadRoutes);
app.use("/api/v1", reportesRoutes);
app.use("api/v1", validacionesRoutes);
app.use("/", authRoutes);

app.listen(5000, ()=>{
    console.log('Server is running')
})
