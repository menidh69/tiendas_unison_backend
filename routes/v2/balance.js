const express = require("express");
const router = express.Router();
const { Balance, Tienda } = require("../../models/entities");

router.get("/balance", async (req, res) => {
  const balance = await Balance.findAll({ include: Tienda });
  return res.json({ balances: balance });
});

router.get("/balance/:id_tienda", async (req, res) => {
  const balance = await Balance.findOne({
    where: { id_tienda: req.params.id_tienda },
  });
  return res.json({ balance: balance });
});

module.exports = router;
