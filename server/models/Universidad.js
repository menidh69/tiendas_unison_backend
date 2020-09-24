const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'universidad',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        ciudad: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        },
        validada: {
            type: Sequelize.BOOLEAN
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'universidad'
    }
)