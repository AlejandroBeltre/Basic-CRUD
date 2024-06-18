# Web Full Stack Test
Este proyecto es una aplicación web full-stack con un frontend en React y un backend en .NET.

## Tabla de Contenidos
- [Introducción](#introducción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Construir la Aplicación](#construir-la-aplicación)
- [Pruebas](#pruebas)
- [Docker](#docker)
- [Base de Datos](#base-de-datos)
- [Más Información](#más-información)

## Introducción

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app) para el frontend y .NET Web API para el backend.

## Requisitos Previos

- Node.js
- npm
- .NET SDK
- SQL Server

## Instalación
1. **Clonar el repositorio:**

```bash
git clone https://github.com/AlejandroBeltre/testFullStackJunior.git

cd testFullStackJunior
```

2. **Instalar dependencias del frontend:**

```bash
cd frontend 

npm install
```

3. **Instalar dependencias del backend:**

```bash
cd backend

dotnet restore
```

4. **Crear la base de datos:**

- Ejecuta el script ['WebAppDB.sql'](database/WebAppDB.sql) ubicado en la carpeta [Database](database)
