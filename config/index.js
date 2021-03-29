const dotenv = require("dotenv");
dotenv.config();

const config = {
  DATABASE_CONFIG: {
    DB_NAME: process.env.DB,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
  },
  SG_MAIL_API: process.env.SENDGRID_API_KEY,
  OPENPAY_CONFIG: {
    OPENPAY_ID: process.env.OPENPAY_ID,
    OPENPAY_PRIVATE_KEY: process.env.OPENPAY_PRIVATE_KEY,
  },
};

module.exports = config;
