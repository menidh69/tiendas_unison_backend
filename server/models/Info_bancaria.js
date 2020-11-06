const Sequelize = require("sequelize");
const db = require("../db/db");
const Usuario = require("./Usuario");

const Info_bancaria = db.sequelize.define(
    'info_bancaria',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: Sequelize.INTEGER
        },
        nombre_titular:{
            type: Sequelize.STRING
        },
        num_tarjeta:{
            type: Sequelize.INTEGER
        },
        exp_date:{
            type: Sequelize.INTEGER
        },
        cvv:{
            type: Sequelize.INTEGER
        },
        cpp:{
            type: Sequelize.INTEGER
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'info_bancaria'
    }
)

module.exports = Info_bancaria;
