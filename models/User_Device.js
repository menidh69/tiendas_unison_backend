const Sequelize = require("sequelize");
const db = require("../db/db");

const User_Device = db.sequelize.define(
  "user_device",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    id_usuario: {
      type: Sequelize.INTEGER,
    },
    expoToken: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "user_device",
  }
);

module.exports = User_Device;
