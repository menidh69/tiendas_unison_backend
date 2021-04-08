const Sequelize = require("sequelize");
const db = require("../db/db");

const transaccion = db.sequelize.define(
  "transaccion",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: Sequelize.DATE,
    },
    id_tienda: {
      type: Sequelize.INTEGER,
    },
    monto: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "transaccion",
  }
);

module.exports = transaccion;
