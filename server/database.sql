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