const express = require("express");
const router = express.Router();
const { Usuario, User_Device } = require("../../models/entities");
const sendNotification = require("../../controllers/notifications");

router.get("/usuario/:id_user/expo-token", async (req, res) => {
  const datos = await Usuario.findOne({
    where: {
      id: req.params.id_user,
    },
  });
  res.json({ datos: datos });
});

router.post("/usuario/:id_user/notification", (req, res) => {
  sendNotification(
    [req.body.expoToken],
    [{ producto: "Papas" }, { producto: "pollo" }]
  );
  return res.json({ message: "Enviado" });
});

router.put("/usuario/:id_user/expo-token", async (req, res) => {
  await Usuario.update(
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
