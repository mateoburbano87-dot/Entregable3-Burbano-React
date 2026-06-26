// src/routes/carts.router.js
// Rutas para la gestión de carritos

const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

const cartManager = new CartManager();

// POST /api/carts - Crear un nuevo carrito
router.post('/', (req, res) => {
    try {
        const result = cartManager.createCart();
        res.status(201).json({ status: 'success', payload: result.cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/carts/:cid - Obtener un carrito por ID
router.get('/:cid', (req, res) => {
    try {
        const { cid } = req.params;
        const id = parseInt(cid);
        
        if (isNaN(id)) {
            return res.status(400).json({ status: 'error', message: 'El ID debe ser un número' });
        }

        const cart = cartManager.getCartById(id);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: `Carrito con ID ${id} no encontrado` });
        }

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/carts/:cid/products/:pid - Agregar producto al carrito
router.post('/:cid/products/:pid', (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cartId = parseInt(cid);
        const productId = parseInt(pid);
        
        if (isNaN(cartId) || isNaN(productId)) {
            return res.status(400).json({ status: 'error', message: 'Los IDs deben ser números' });
        }

        const result = cartManager.addProductToCart(cartId, productId);
        if (!result.success) {
            return res.status(404).json({ status: 'error', message: result.message });
        }

        res.json({ status: 'success', payload: result.cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;