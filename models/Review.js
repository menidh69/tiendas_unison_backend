const Sequelize = require("sequelize");
const db = require("../db/db");


const Review = db.sequelize.define(
    'review',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_producto: {
            type: Sequelize.INTEGER
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        calificacion:{
            type: Sequelize.INTEGER
        },
        comentario: {
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'review'
    }
)

module.exports = Review;