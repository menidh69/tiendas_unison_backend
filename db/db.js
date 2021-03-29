//------------MYSQL CONFIG -----------------------
const Sequelize = require("sequelize");
const db = {};
const { DATABASE_CONFIG } = require("../config/index");
//Cada quien configure las variables de conexion
//Primer argumento=nombre de BD, Segundo argumento=usuario, Tercer argumento=contraseña

const sequelize = new Sequelize(
  DATABASE_CONFIG.DB_NAME,
  DATABASE_CONFIG.USER,
  DATABASE_CONFIG.PASSWORD,
  {
    host: DATABASE_CONFIG.HOST,
    dialect: "mysql",
    operatorsAliases: "0",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  { query: { raw: true } }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

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
