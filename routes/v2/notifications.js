const express = require("express");
const router = express.Router();
const { Usuario, User_Device } = require("../../models/entities");

router.post("/expo-token", async (req, res) => {
  const { expoToken, id_usuario } = req.body;
  try {
    const user_dev = await User_Device.create({
      id_usuario: id_usuario,
      expoToken: expoToken,
    });
    res.json({ message: "Creado con exito", token: user_dev });
  } catch (e) {
    res.json({ message: "Error", error: e });
  }
});

module.exports = router;