const express = require('express')
const cors = require('cors');
const pool = require('./db')

const app = express()

app.use(cors());
app.use(express.json()) //req.body




app.get('/', (req,res)=>{
    res.send('Hola')
})

//ROUTES 

//----------------TIENDAS-----------------------------------



//----------------------------------------------------------
//----------------UNIVERSIDAD--------------------------------

//GET ALL UNIVERSIDADES
app.get("/api/v1/universidades", async (req, res)=>{
    try{
        const allUniversidades = await pool.query(
            "SELECT * FROM universidad")
        res.json(allUniversidades.rows)
    }catch(err){
        console.error(err.message)
    }
});


//POST NUEVA UNIVERSIDAD
app.post("/api/v1/universidades", async (req, res)=>{
    try{
        const {nombre} = req.body;
        const {ciudad} = req.body;
        const {estado} = req.body;
        const {validada} = 'false'
        console.log(req.body)
        const newUni = await pool.query(
            "INSERT INTO universidad (nombre, ciudad, estado, validada) VALUES($1,$2,$3,$4) RETURNING *",
            [nombre, ciudad, estado, validada]
            )
        res.send('exito')
    }catch(err){
        console.error(err.message)
    }
});

//GET UNIVERSIDAD POR ID
app.get("/api/v1/universidades/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const uni = await pool.query("SELECT * FROM universidad WHERE id= $1", [id]);
        res.json(uni.rows[0]);
    }catch(err){
        console.error(err)
    }
})

//PUT MODIFICAR UNIVERSIDAD 
app.put("/api/v1/universidades/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const {nombre} = req.body;
        const {ciudad} = req.body;
        const {estado} = req.body;
        const {validada} = req.body;
        const uni = await pool.query("UPDATE universidad SET nombre=$2, ciudad=$3, estado=$4, validada= $5 WHERE id= $1 RETURNING *", 
        [id,nombre,ciudad,estado,validada]);
        
        res.status(200).json({
            status:"success",
            data: {
                universidad: uni.rows[0]
            }
        });

    }catch(err){
        console.error(err)
    }
});

//ELIMINAR UNIVERSIDAD
app.delete("/api/v1/universidades/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const deleteUni = await pool.query('DELETE FROM universidad WHERE id = $1', [id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.error(err)
    }
});

app.listen(5000, ()=>{
    console.log('Server is running')
})