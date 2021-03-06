const Sequelize = require ("sequelize");
const db = require("../db/db");

const Balance = db.sequelize.define (
    'balance',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_tienda: {
            type: Sequelize.INTEGER
        },
        balance:{
            type: Sequelize.FLOAT
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'balance'
    }
)

module.exports = Balance;