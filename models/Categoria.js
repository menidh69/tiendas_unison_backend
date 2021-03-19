const Sequelize = require("sequelize");
const db = require("../db/db");


const Categoria = db.sequelize.define(
    'categoria',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'categoria'
    }
)

module.exports = Categoria;