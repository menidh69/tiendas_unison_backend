const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("../models/Usuario");

const Orden = db.sequelize.define(
    'orden',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        fecha: {
          type: Sequelize.DATE
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'orden'
    }
)

module.exports = Orden;
