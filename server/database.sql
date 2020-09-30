-- Insert all DB Scripts
CREATE DATABASE tiendas_unison_web;

CREATE TABLE universidad(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    validada boolean
)

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR (100),
    email VARCHAR(50),
    contra VARCHAR(50),
    tel VARCHAR(50),
    universidad VARCHAR(100),
    tipo_usuario VARCHAR(50) DEFAULT 'cliente'
)
