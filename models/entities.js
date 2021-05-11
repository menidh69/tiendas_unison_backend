const Orden = require("./Orden");

const entities = {
  Usuario: require("./Usuario"),
  Carrito_item: require("./CarritoItem"),
  Productos: require("./Productos"),
  Carrito: require("./Carrito"),
  Tienda: require("./Tienda"),
  Orden: require("./Orden"),
  Ordenitem: require("./OrdenItem"),
  Venta: require("./Venta"),
  Review_Tienda: require("./Review_Tienda"),
  Ubicacion: require("./Ubicacion"),
  Review: require("./Review"),
  Balance: require("./Balance"),
  Openpay_Bank_Account: require("./Openpay_Bank_Account"),
  Openpay_customer: require("./Openpay_customer"),
  Transaccion: require("./Transaccion"),
  User_Device: require("./User_Device"),
};

entities.Usuario.hasOne(entities.Openpay_customer, {
  foreignKey: "id_usuario",
});
entities.Openpay_customer.belongsTo(entities.Usuario, {
  foreignKey: "id_usuario",
});
entities.Carrito.hasMany(entities.Carrito_item, { foreignKey: "id_carrito" });
entities.Usuario.hasOne(entities.Carrito, { foreignKey: "id_usuario" });
entities.Productos.hasMany(entities.Carrito_item, {
  foreignKey: "id_producto",
});
entities.Usuario.hasOne(entities.User_Device, { foreignKey: "id_usuario" });
entities.User_Device.belongsTo(entities.Usuario, { foreignKey: "id_usuario" });
entities.Tienda.hasMany(entities.Productos, { foreignKey: "id_tienda" });
entities.Productos.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });
entities.Carrito_item.belongsTo(entities.Productos, {
  foreignKey: "id_producto",
});
entities.Tienda.hasMany(entities.Transaccion, { foreignKey: "id_tienda" });
entities.Transaccion.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });
entities.Orden.hasMany(entities.Ordenitem, { foreignKey: "id_orden" });
entities.Ordenitem.belongsTo(entities.Orden, { foreignKey: "id_orden" });
entities.Productos.hasMany(entities.Ordenitem, { foreignKey: "id_producto" });
entities.Ordenitem.belongsTo(entities.Productos, { foreignKey: "id_producto" });
entities.Orden.hasOne(entities.Venta, { foreignKey: "id_orden" });
entities.Tienda.hasOne(entities.Balance, { foreignKey: "id_tienda" });
entities.Balance.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });
entities.Tienda.hasOne(entities.Openpay_Bank_Account, {
  foreignKey: "id_tienda",
});
entities.Openpay_Bank_Account.belongsTo(entities.Tienda, {
  foreignKey: "id_tienda",
});
entities.Usuario.hasMany(entities.Orden, { foreignKey: "id_usuario" });
entities.Orden.belongsTo(entities.Usuario, { foreignKey: "id_usuario" });
entities.Tienda.hasMany(entities.Orden, { foreignKey: "id_tienda" });

entities.Orden.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });
entities.Usuario.hasOne(entities.Tienda, { foreignKey: "id_usuario" });
entities.Tienda.belongsTo(entities.Usuario, { foreignKey: "id_usuario" });

entities.Tienda.hasMany(entities.Review_Tienda, { foreignKey: "id_tienda" });
entities.Review_Tienda.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });
entities.Usuario.hasMany(entities.Review_Tienda, { foreignKey: "id_usuario" });
entities.Review_Tienda.belongsTo(entities.Usuario, {
  foreignKey: "id_usuario",
});

entities.Tienda.hasOne(entities.Ubicacion, { foreignKey: "id_tienda" });
entities.Ubicacion.belongsTo(entities.Tienda, { foreignKey: "id_tienda" });

entities.Productos.hasMany(entities.Review, { foreignKey: "id_producto" });
entities.Review.belongsTo(entities.Productos, { foreignKey: "id_producto" });

module.exports = entities;
