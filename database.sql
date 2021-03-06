-- Insert all DB Scripts
CREATE DATABASE tiendas_unison_web;

CREATE TABLE universidad(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    lat DECIMAL(18,15),
    lng DECIMAL(18,15),
    validada boolean
);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    apellidos VARCHAR(100),
    email VARCHAR(50),
    contra VARCHAR(100),
    tel VARCHAR(50),
    id_universidad BIGINT UNSIGNED,
    tipo_usuario VARCHAR(50) DEFAULT 'cliente',
    resetToken VARCHAR(100) DEFAULT NULL,
    expireToken DATETIME DEFAULT NULL,
    expoToken VARCHAR(255),

    CONSTRAINT fk_universidad
    FOREIGN KEY (id_universidad)
    REFERENCES universidad(id)
    ON DELETE CASCADE
);

CREATE TABLE fbuser(
    user_id INT PRIMARY KEY,
    token VARCHAR(255)
);

CREATE TABLE tipo_tienda(
    id SERIAL PRIMARY KEY,
    tipo_tienda VARCHAR(50),
    descripcion VARCHAR(150)
);

CREATE TABLE tienda(
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tipo_tienda BIGINT UNSIGNED,
    nombre VARCHAR (100),
    horario VARCHAR (50),
    url_imagen VARCHAR(255),
    tarjeta boolean,
    fechaSub Date,
    validada boolean,
    activo boolean,
    lat DECIMAL(18,15),
    lng DECIMAL(18,15),


    CONSTRAINT fk_tipo_tienda
    FOREIGN KEY (id_tipo_tienda)
    REFERENCES tipo_tienda(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE SET NULL
);



CREATE TABLE reporte_tienda(
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tienda BIGINT UNSIGNED,


    CONSTRAINT fk_usuario1
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE SET NULL,


    CONSTRAINT fk_tienda1
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE SET NULL

);

CREATE TABLE validar_tienda(
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tienda BIGINT UNSIGNED,
    verificado BOOLEAN,


    CONSTRAINT fk_usuario2
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE SET NULL,


    CONSTRAINT fk_tienda2
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE SET NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    nombre VARCHAR (50),
    precio FLOAT (6,2),
    id_categoria BIGINT UNSIGNED,
    url_imagen VARCHAR (255),
    descripcion VARCHAR (150),

    CONSTRAINT fk_tienda
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES categoria(id)
    ON DELETE SET NULL
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(20) UNIQUE,
    descripcion VARCHAR(50)
)

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,

    CONSTRAINT fk_usuario3
    FOREIGN KEY (id_usuario)
    REFERENCES  usuario(id)
    ON DELETE SET NULL
);

CREATE TABLE carrito_item (
    id SERIAL PRIMARY KEY,
    id_producto BIGINT UNSIGNED,
    id_carrito BIGINT UNSIGNED,
    cantidad INT,

    CONSTRAINT fk_producto
    FOREIGN KEY (id_producto)
    REFERENCES productos(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_carrito
    FOREIGN KEY (id_carrito)
    REFERENCES carrito(id)
    ON DELETE SET NULL
);

CREATE TABLE openpay_customer {
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    openpay_id VARCHAR(255),
    card_id VARCHAR(255),

    CONSTRAINT fk_usuario_openpay
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE SET NULL
}

CREATE TABLE orden (
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tienda BIGINT UNSIGNED,
    entregado boolean,
    fecha Date,

    CONSTRAINT fk_usuario5
    FOREIGN KEY (id_usuario)
    REFERENCES  usuario(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_tienda6
    FOREIGN KEY (id_tienda)
    REFERENCES  tienda(id)
    ON DELETE SET NULL
);

CREATE TABLE orden_item (
    id SERIAL PRIMARY KEY,
    id_orden BIGINT UNSIGNED,
    id_producto BIGINT UNSIGNED,
    cantidad INT,

    CONSTRAINT fk_producto1
    FOREIGN KEY (id_producto)
    REFERENCES productos(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_orden
    FOREIGN KEY (id_orden)
    REFERENCES orden(id)
    ON DELETE SET NULL
);


CREATE TABLE venta(
    id SERIAL PRIMARY KEY,
    id_transaccion VARCHAR(255),
    amount INT,
    id_orden BIGINT UNSIGNED,
 
    CONSTRAINT fk_orden2
    FOREIGN KEY (id_orden)
    REFERENCES orden(id)
    ON DELETE CASCADE
);

CREATE TABLE review_tienda(
    id SERIAL PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    id_usuario BIGINT UNSIGNED,
    comentario VARCHAR(255),
    calificacion INT,

    CONSTRAINT fk_tienda8
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_usuario8
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE CASCADE
);

CREATE TABLE review(
    id SERIAL PRIMARY KEY,
    id_producto BIGINT UNSIGNED,
    id_usuario BIGINT UNSIGNED,
    calificacion INTEGER,
    comentario VARCHAR(255),

    CONSTRAINT fk_producto2
    FOREIGN KEY (id_producto)
    REFERENCES productos(id)
    ON DELETE SET NULL,

    CONSTRAINT fk_usuario7
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE SET NULL

);

CREATE TABLE balance(
    id SERIAL PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    balance FLOAT(15,2)
);

CREATE TABLE transaccion (
    id SERIAL PRIMARY KEY,
    fecha DATETIME,
    id_tienda BIGINT UNSIGNED,
    monto FLOAT(15,2),

    CONSTRAINT fk_tienda_8
    FOREIGN KEY (id_tienda)
    REFERENCES  tienda(id)
    ON DELETE CASCADE
);

CREATE TABLE openpay_bank_account (
    id VARCHAR(255) PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    id_bank_account VARCHAR(255),

    CONSTRAINT fk_tienda_7
    FOREIGN KEY (id_tienda)
    REFERENCES  tienda(id)
    ON DELETE CASCADE
);


-- Agregar tipo tienda

INSERT INTO tipo_tienda (tipo_tienda, descripcion) VALUES ("Cooperativa", "Tienda con contrato de la universidad"),
("Puesto", "Puesto independiente dentro de la universidad"), ("Cafeteria", "Cafeteria oficial universitaria");

INSERT INTO categoria (categoria, descripcion) VALUES ("Desayuno", "Comida mañanera"),
("Comida", "Comida completa"), ("Saludable", "Comida baja en calorias"),
("Bebidas", "Productos liquidos"), ("Postres", "Aperitivos dulces"), ("Snacks", "Snacks");