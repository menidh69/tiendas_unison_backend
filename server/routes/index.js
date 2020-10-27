const router = require('express').Router();
const tiendasRoutes = require('./tiendas')
const usuarioRoutes = require('./usuario')
const productosRoutes = require('./productos')
const universidadRoutes = require('./universidad')
const authRoutes = require('./auth')
const path = require('path');

router.use("/api/v1", productosRoutes);
router.use("/api/v1", usuarioRoutes);
router.use("/api/v1", tiendasRoutes);
router.use("/api/v1", universidadRoutes);
router.use("/", authRoutes);
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;

