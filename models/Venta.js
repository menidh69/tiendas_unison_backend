const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Venta = db.sequelize.define(
    'venta',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_transaccion:{
            type: Sequelize.STRING
        },
        id_orden:{
            type: Sequelize.INTEGER
        },
        amount:{
            type: Sequelize.INTEGER
        }
       
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'venta'
    }
)

module.exports = Venta;