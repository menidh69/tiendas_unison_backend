const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'usuario',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        contra: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        }
        universidad: {
            type: Sequelize.STRING
        }
        

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuario'
    }
)
