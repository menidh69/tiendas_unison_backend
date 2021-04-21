const express = require("express");
const router = express.Router();
const Usuario = require("../../models/Usuario");

router.delete("/usuario/:id_user", async (req, res) => {
  const user = await Usuario.findOne({
    where: {
      id: req.params.id_user,
    },
  });
  try {
    await user.destroy();
    res.json({ message: "Eliminando con exito" });
  } catch (e) {
    res.json({ message: "Ocurrió un error: " + e });
  }
});

module.exports = router;
