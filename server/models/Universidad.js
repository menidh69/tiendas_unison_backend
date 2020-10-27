const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Universidad = db.sequelize.define(
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
// Universidad.hasMany(Usuario);

module.exports = Universidad;
