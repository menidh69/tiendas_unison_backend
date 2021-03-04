const router = require('express').Router();
const tiendasRoutes = require('./tiendas')
const usuarioRoutes = require('./usuario')
const productosRoutes = require('./productos')
const universidadRoutes = require('./universidad')
const authRoutes = require('./auth')
const reportes = require('./reportes');
const validaciones = require('./validaciones')
const infobanco = require('./infobanco');
const ordenes = require('./ordenes');
const stripe = require('./stripe');
const ventas = require('./ventas');
const reviews = require('./reviews')
const openpay = require('./v2/openpay')

const path = require('path');

router.use("/api/v2", openpay);
router.use("/api/v1", productosRoutes);
router.use("/api/v1", usuarioRoutes);
router.use("/api/v1", tiendasRoutes);
router.use("/api/v1", universidadRoutes);
router.use("/api/v1", reportes);
router.use("/api/v1", validaciones);
router.use("/api/v1", infobanco);
router.use("/api/v1", ordenes)
router.use("/api/v1", stripe);
router.use("/api/v1", ventas);
router.use("/api/v1", reviews);
router.use("/", authRoutes);

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

module.exports = router;