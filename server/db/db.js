//------------MYSQL CONFIG -----------------------
const Sequelize = require('sequelize')
const db = {}

//Cada quien configure las variables de conexion
//Primer argumento=nombre de BD, Segundo argumento=usuario, Tercer argumento=contraseña

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {

    host: process.env.HOST,
    dialect: 'mysql',
    operatorsAliases: '0',

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
},
{query:{raw:true}});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;

//-------POSTGRES CONFIG-------------------------
// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: process.env.PGUSER || 'postgres',
//     password: process.env.PGPASSWORD || "manuel",
//     host: "localhost",
//     port: 5432,
//     database: process.env.DBNAME || 'tiendas_unison'
// })

// module.exports = pool;
