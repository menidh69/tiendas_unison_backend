const Sequelize = require ("sequelize");
const db = require("../db/db");

const Openpay_customer = db.sequelize.define(
    'openpay_customer',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        openpay_id: {
            type: Sequelize.STRING
        },
        card_id: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'openpay_customer'
    }
)

module.exports = Openpay_customer;