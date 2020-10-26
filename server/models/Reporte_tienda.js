const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'reporte_tienda',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        id_tienda: {
            type: Sequelize.INTEGER
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'reporte_tienda'
    }
)
