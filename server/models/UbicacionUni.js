const Sequelize = require("sequelize");
const db = require("../db/db");
const Universidad = require("./Universidad");
const Usuario = require("./Usuario");

const UbicacionUni = db.sequelize.define(
    'ubicacionUni',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_universidad: {
            type: Sequelize.STRING
        },
        lat: {
            type: Sequelize.DECIMAL
        },
        lng: {
            type: Sequelize.DECIMAL
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ubicacionUni'
    }
)
// Universidad.hasMany(Usuario);

module.exports = UbicacionUni;