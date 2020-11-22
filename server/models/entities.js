const entities = {
    Usuario: require("./Usuario"),
    Carrito_item: require("./CarritoItem"),
    Productos: require("./Productos"),
    Carrito: require("./Carrito"),
    Tienda: require("./Tienda")
};

entities.Carrito.hasMany(entities.Carrito_item, {foreignKey: "id_carrito"})
entities.Usuario.hasOne(entities.Carrito, {foreignKey: "id_usuario"})
entities.Productos.hasMany(entities.Carrito_item, {foreignKey: "id_producto"})
entities.Tienda.hasMany(entities.Productos, {foreignKey: "id_tienda"})
entities.Productos.belongsTo(entities.Tienda, {foreignKey: "id_tienda"})
entities.Carrito_item.belongsTo(entities.Productos, {foreignKey: "id_producto"})
module.exports = entities;