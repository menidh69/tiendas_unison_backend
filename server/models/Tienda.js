const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'tienda',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: Sequelize.INTEGER
        },
        id_tipo_tienda:{
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        horario: {
            type: Sequelize.STRING
        },
        url_imagen:{
            type: Sequelize.STRING
        },
        tarjeta: {
            type: Sequelize.BOOLEAN
        },
        fechaSub: {
          type: Sequelize.DATE
        },
        validada: {
            type: Sequelize.BOOLEAN
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tienda'
    }
)
