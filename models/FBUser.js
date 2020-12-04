const Sequelize = require("sequelize");
const db = require("../db/db");

module.exports = db.sequelize.define(
    'fbuser',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'usuario'
    }
)