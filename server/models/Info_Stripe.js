const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Info_Stripe = db.sequelize.define(
    'info_stripe',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tienda:{
            type: Sequelize.INTEGER
        },
        id_stripe:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'info_stripe'
    }
)

module.exports = Info_Stripe;