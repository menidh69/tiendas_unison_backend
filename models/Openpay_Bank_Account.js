const Sequelize = require("sequelize");
const db = require("../db/db");

const Openpay_Bank_Account = db.sequelize.define(
  "openpay_bank_account",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    id_tienda: {
      type: Sequelize.INTEGER,
    },
    id_bank_account: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "openpay_bank_account",
  }
);

module.exports = Openpay_Bank_Account;
