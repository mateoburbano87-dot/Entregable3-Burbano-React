// src/routes/products.router.js
// Rutas para la gestión de productos

const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager();

// GET /api/products - Listar todos los productos
router.get('/', (req, res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts(limit ? parseInt(limit) : null);
        
        res.json({
            status: 'success',
            payload: products,
            total: products.length
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// GET /api/products/:pid - Obtener un producto por ID
router.get('/:pid', (req, res) => {
    try {
        const { pid } = req.params;
        const id = parseInt(pid);
        
        if (isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'El ID debe ser un número'
            });
        }

        const product = productManager.getProductById(id);
        
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: `Producto con ID ${id} no encontrado`
            });
        }

        res.json({
            status: 'success',
            payload: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// POST /api/products - Crear un nuevo producto
router.post('/', (req, res) => {
    try {
        const result = productManager.addProduct(req.body);
        
        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                message: result.message
            });
        }

        res.status(201).json({
            status: 'success',
            payload: result.product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// PUT /api/products/:pid - Actualizar un producto
router.put('/:pid', (req, res) => {
    try {
        const { pid } = req.params;
        const id = parseInt(pid);
        
        if (isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'El ID debe ser un número'
            });
        }

        const result = productManager.updateProduct(id, req.body);
        
        if (!result.success) {
            return res.status(404).json({
                status: 'error',
                message: result.message
            });
        }

        res.json({
            status: 'success',
            payload: result.product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// DELETE /api/products/:pid - Eliminar un producto
router.delete('/:pid', (req, res) => {
    try {
        const { pid } = req.params;
        const id = parseInt(pid);
        
        if (isNaN(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'El ID debe ser un número'
            });
        }

        const result = productManager.deleteProduct(id);
        
        if (!result.success) {
            return res.status(404).json({
                status: 'error',
                message: result.message
            });
        }

        res.json({
            status: 'success',
            message: result.message
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;