const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || "manuel",
    host: "localhost",
    port: 5432,
    database: process.env.DBNAME || 'tiendas_unison'
})