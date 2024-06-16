-- Crear la base de datos y usarla.
CREATE DATABASE WebAppDB;
USE WebAppDB;

-- Crear la tabla de usuarios
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('admin', 'user')),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- Crear la tabla de productos
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    LastUpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
