const Sequelize = require ("sequelize");
const db = require("../db/db");

const Openpay_card = db.sequelize.define(
    'openpay_card',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        card_id: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'openpay_card'
    }
)

module.exports = Openpay_card;