const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("../models/Usuario");

const Carrito = db.sequelize.define(
    'carrito',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'carrito'
    }
)


// Carrito.hasOne(Usuario, {foreignKey: 'id'});
module.exports = Carrito;
