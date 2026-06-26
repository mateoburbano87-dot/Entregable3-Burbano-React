// src/app.js
// Configuración de Express

const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta 404
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Ruta ${req.method} ${req.url} no encontrada`
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Error interno del servidor'
    });
});

module.exports = app;