const express = require("express");
const router = express.Router();
const { Balance, Tienda } = require("../../models/entities");

router.get("/balance", async (req, res) => {
  const balance = await Balance.findAll({ include: Tienda });
  return res.json({ balances: balance });
});

module.exports = router;
