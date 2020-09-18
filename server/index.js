const express = require('express')
const cors = require('cors');
const pool = require('./db')

const app = express()

app.use(cors());
app.use(express.json()) //req.body


//ROUTES

app.get('/', (req,res)=>{
    res.send('Hola')
})




app.listen(5000, ()=>{
    console.log('Server is running')
})