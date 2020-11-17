const Sequelize = require("sequelize");
const db = require("../db/db");
const Productos = require("../models/Productos");
const Orden = require("../models/Orden");

const ordenitem = db.sequelize.define(
    'orden_item',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_orden: {
            type: Sequelize.INTEGER
        },
        id_producto: {
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'orden_item'
    }
)


module.exports = ordenitem;
