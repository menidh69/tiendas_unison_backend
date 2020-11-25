const Orden = require("./Orden");

const entities = {
    Usuario: require("./Usuario"),
    Carrito_item: require("./CarritoItem"),
    Productos: require("./Productos"),
    Carrito: require("./Carrito"),
    Tienda: require("./Tienda"),
    Orden: require("./Orden"),
    Ordenitem: require("./OrdenItem"),
    Venta: require("./Venta")
};

entities.Carrito.hasMany(entities.Carrito_item, {foreignKey: "id_carrito"})
entities.Usuario.hasOne(entities.Carrito, {foreignKey: "id_usuario"})
entities.Productos.hasMany(entities.Carrito_item, {foreignKey: "id_producto"})
entities.Tienda.hasMany(entities.Productos, {foreignKey: "id_tienda"})
entities.Productos.belongsTo(entities.Tienda, {foreignKey: "id_tienda"})
entities.Carrito_item.belongsTo(entities.Productos, {foreignKey: "id_producto"})
entities.Orden.hasMany(entities.Ordenitem, {foreignKey: "id_orden"})
entities.Ordenitem.belongsTo(entities.Orden, {foreignKey: "id_orden"})
entities.Productos.hasMany(entities.Ordenitem, {foreignKey: "id_producto"})
entities.Ordenitem.belongsTo(entities.Productos, {foreignKey: "id_producto"})
entities.Orden.hasOne(entities.Venta, {foreignKey: "id_orden"})
entities.Tienda.hasMany(entities.Orden, {foreignKey: "id_tienda"})
entities.Orden.belongsTo(entities.Tienda, {foreignKey:"id_tienda"})
entities.Usuario.hasOne(entities.Tienda, {foreignKey: 'id_usuario'});
entities.Tienda.belongsTo(entities.Usuario, {foreignKey: "id_usuario"})
module.exports = entities;