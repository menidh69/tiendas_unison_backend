-- Insert all DB Scripts
CREATE DATABASE tiendas_unison_web;

CREATE TABLE universidad(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    validada boolean
);

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    email VARCHAR(50),
    contra VARCHAR(100),
    tel VARCHAR(50),
    id_universidad BIGINT UNSIGNED,
    tipo_usuario VARCHAR(50) DEFAULT 'cliente',
    resetToken VARCHAR(100) DEFAULT NULL,
    expireToken DATETIME DEFAULT NULL,

    CONSTRAINT fk_universidad
    FOREIGN KEY (id_universidad)
    REFERENCES universidad(id)
    ON DELETE SET NULL
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
    categoria VARCHAR (20),
    url_imagen VARCHAR (255),
    descripcion VARCHAR (150),

    CONSTRAINT fk_tienda
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE SET NULL
);

CREATE TABLE ubicacion (
    id SERIAL PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    lat DECIMAL(18,15),
    lng DECIMAL(18,15),

    CONSTRAINT fk_tienda_ubi
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE CASCADE
);

CREATE TABLE ubicacionUni (
    id SERIAL PRIMARY KEY,
    id_universidad BIGINT UNSIGNED,
    lat DECIMAL(18,15),
    lng DECIMAL(18,15),

    CONSTRAINT fk_universidad_ubi
    FOREIGN KEY (id_universidad)
    REFERENCES universidad(id)
    ON DELETE CASCADE
);

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

CREATE TABLE info_bancaria(
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,

    nombre_titular VARCHAR (100),
    num_tarjeta VARCHAR(50),
    exp_date VARCHAR (20),
    cvv BIGINT,
    cpp BIGINT,

    CONSTRAINT fk_usuario4
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id)
    ON DELETE CASCADE
);

CREATE TABLE orden (
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tienda BIGINT UNSIGNED,
    fecha Date,

    CONSTRAINT fk_usuario5
    FOREIGN KEY (id_usuario)
    REFERENCES  usuario(id)
    ON DELETE SET NULL

    CONSTRAINT fk_tienda4
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

CREATE TABLE info_stripe(
    id SERIAL PRIMARY KEY,
    id_tienda BIGINT UNSIGNED,
    id_stripe VARCHAR(255),

     CONSTRAINT fk_tienda3
    FOREIGN KEY (id_tienda)
    REFERENCES tienda(id)
    ON DELETE CASCADE
);

