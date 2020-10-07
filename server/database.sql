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
    universidad VARCHAR(100),
    tipo_usuario VARCHAR(50) DEFAULT 'cliente',
    resetToken VARCHAR(100) DEFAULT NULL,
    expireToken DATETIME DEFAULT NULL
);

CREATE TABLE tienda(
    id SERIAL PRIMARY KEY,
    id_usuario BIGINT UNSIGNED,
    id_tipo_tienda BIGINT UNSIGNED,
    nombre VARCHAR (100),
    horario VARCHAR (50),
    url_imagen VARCHAR(255),
    tarjeta boolean,

    CONSTRAINT fk_tipo_tienda 
    FOREIGN KEY (id_tipo_tienda)
    REFERENCES tipo_tienda(id) 
    ON DELETE SET NULL,

    CONSTRAINT fk_usuario 
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id) 
    ON DELETE SET NULL
);

CREATE TABLE tipo_tienda(
    id SERIAL PRIMARY KEY,
    tipo_tienda VARCHAR(50),
    descripcion VARCHAR(150)
);
