const Sequelize = require("sequelize");
const db = require("../db/db");

const Ubicacion = db.sequelize.define(
    'ubicacion',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tienda: {
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
        tableName: 'ubicacion'
    }
)
module.exports=Ubicacion;