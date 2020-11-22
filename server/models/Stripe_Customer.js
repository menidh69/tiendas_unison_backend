const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Stripe_Customer = db.sequelize.define(
    'stripe_customer',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: Sequelize.INTEGER
        },
        id_stripe:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'stripe_customer'
    }
)

module.exports = Stripe_Customer;