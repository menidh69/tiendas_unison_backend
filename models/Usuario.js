const Sequelize = require("sequelize");
const db = require("../db/db");
const Tienda = require("./Tienda");
const Universidad = require("./Universidad");
const Info_bancaria = require("./Info_bancaria");

const Usuario = db.sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    contra: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.STRING,
    },
    id_universidad: {
      type: Sequelize.INTEGER,
    },
    tipo_usuario: {
      type: Sequelize.STRING,
    },
    resetToken: {
      type: Sequelize.STRING,
    },
    expireToken: {
      type: Sequelize.DATE,
    },
    expoToken: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "usuario",
  }
);

Usuario.hasOne(Tienda, { foreignKey: "id_usuario" });
Usuario.hasOne(Info_bancaria, { foreignKey: "id_usuario" });
module.exports = Usuario;
