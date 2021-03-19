const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'validar_tienda',
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
        },
        verificado: {
            type: Sequelize.BOOLEAN
        },
        

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'validar_tienda'
    }
)
