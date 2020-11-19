-- Create Test Database
USE master;
GO
DROP DATABASE IF EXISTS testDB;
GO
CREATE DATABASE testDB;
GO
-- Create users table
USE testDB;
GO
DROP TABLE IF EXISTS usuarios_web;
GO
CREATE TABLE usuarios_web (
    usuario_id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    nivel_usuario TINYINT NOT NULL DEFAULT 0,
    activo CHAR(32) DEFAULT NULL,
    fecha_registro DATETIME DEFAULT GETDATE(),
    UNIQUE(email)
);
GO
INSERT INTO usuarios_web
    (nombre, apellido, email, pass)
VALUES
    ('John', 'Doe', 'johnd@gmail.com', '1234'),
    ('Jane', 'Doe', 'janed@gmail.com', '12345'),
    ('Mark', 'Test', 'test@gmail.com', '123456')
GO