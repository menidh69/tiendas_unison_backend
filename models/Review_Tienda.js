const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'review_tienda',
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
        comentario:{
            type: Sequelize.STRING
        },
        calificacion:{
            type: Sequelize.INTEGER
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'review_tienda'
    }
)