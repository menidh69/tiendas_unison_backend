const Sequelize = require("sequelize");
const db = require("../db/db");
const Reporte_tienda = require("./Reporte_tienda");
const Ubicacion = require("./Ubicacion");
const Usuario = require("./Usuario");
const Info_Stripe = require("./Info_Stripe");
const Productos = require("./Productos")

const Tienda = db.sequelize.define(
    'tienda',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario:{
            type: Sequelize.INTEGER
        },
        id_tipo_tienda:{
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        horario: {
            type: Sequelize.STRING
        },
        url_imagen:{
            type: Sequelize.STRING
        },
        tarjeta: {
            type: Sequelize.BOOLEAN
        },
        fechaSub: {
          type: Sequelize.DATE
        },
        validada: {
            type: Sequelize.BOOLEAN
        },
        activo:{
            type: Sequelize.BOOLEAN
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
        tableName: 'tienda'
    }
)

Tienda.hasMany(Reporte_tienda, {foreignKey: 'id_tienda'});
Tienda.hasOne(Ubicacion, {foreignKey: 'id_tienda'});
Tienda.hasMany(Info_Stripe, {foreignKey: "id_tienda"})

module.exports = Tienda;
