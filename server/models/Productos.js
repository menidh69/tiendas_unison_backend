const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'productos',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tienda:{
            type: Sequelize.INTEGER
        },
        nombre:{
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        categoria: {
            type: Sequelize.STRING
        },
        url_imagen:{
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'productos'
    }
)