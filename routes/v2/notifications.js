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

router.get("/usuario/:id_user/expo-token", async (req, res) => {
  const datos = await Usuario.findOne({
    where: {
      id: req.params.id_user,
    },
    include: User_Device,
  });
  res.json({ datos: datos });
});

router.put("/usuario/:id_user/expo-token", async (req, res) => {
  await User_Device.update(
    { expoToken: req.body.expoToken },
    {
      where: {
        id: req.params.id_user,
      },
    }
  ).then((device) => {
    return res.json({ message: "Actualizado con exito", device: device });
  });
});

//METODO PARA NOTIFICACION TIENDA

//METODO PARA NOTIFICACION CLIENTE

module.exports = router;
