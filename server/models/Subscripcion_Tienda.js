const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Subscripcion_Tienda = db.sequelize.define(
    'subscripcion_tienda',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_subscripcion:{
            type: Sequelize.STRING
        },
        id_tienda:{
            type: Sequelize.INTEGER
        },
       
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'subscripcion_tienda'
    }
)

module.exports = Subscripcion_Tienda;