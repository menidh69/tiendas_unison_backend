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

app.get("/api/v1/universidades", async (req, res)=>{
    try{
        const allUniversidades = await pool.query(
            "SELECT * FROM universidad")
        res.json(allUniversidades.rows)
    }catch(err){
        console.error(err.message)
    }
});

app.post("/api/v1/universidades", async (req, res)=>{
    try{
        const {nombre} = req.body;
        const {ciudad} = req.body;
        const {estado} = req.body;
        console.log(req.body)
        const newUni = await pool.query(
            "INSERT INTO universidad (nombre, ciudad, estado) VALUES($1,$2,$3) RETURNING *",
            [nombre, ciudad, estado]
            )
        res.send('exito')
    }catch(err){
        console.error(err.message)
    }
});



app.listen(5000, ()=>{
    console.log('Server is running')
})