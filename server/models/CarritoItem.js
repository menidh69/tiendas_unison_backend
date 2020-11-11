const Sequelize = require("sequelize");
const db = require("../db/db");
const Productos = require("../models/Productos");
const Carrito = require("../models/Carrito");

const Carrito_item = db.sequelize.define(
    'carrito_item',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: Sequelize.INTEGER
        },
        id_carrito: {
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'carrito_item'
    }
)


// Carrito_item.belongsTo(Productos);


module.exports = Carrito_item;
