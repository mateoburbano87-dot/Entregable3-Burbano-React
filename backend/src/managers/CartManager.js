// src/managers/CartManager.js
// Gestor de carritos con persistencia en FileSystem

const fs = require('fs');
const path = require('path');

const carritosPath = path.join(__dirname, '../data/carrito.json');

class CartManager {
    constructor() {
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            if (fs.existsSync(carritosPath)) {
                const data = fs.readFileSync(carritosPath, 'utf-8');
                this.carts = JSON.parse(data);
                console.log(`🛒 ${this.carts.length} carritos cargados`);
            } else {
                this.carts = [];
                this.saveCarts();
                console.log('📁 Archivo carrito.json creado');
            }
        } catch (error) {
            console.error('❌ Error al cargar carritos:', error.message);
            this.carts = [];
        }
    }

    saveCarts() {
        try {
            fs.writeFileSync(carritosPath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('❌ Error al guardar carritos:', error.message);
        }
    }

    generateId() {
        if (this.carts.length === 0) return 1;
        const maxId = Math.max(...this.carts.map(c => c.id));
        return maxId + 1;
    }

    createCart() {
        const newCart = {
            id: this.generateId(),
            products: []
        };

        this.carts.push(newCart);
        this.saveCarts();

        return { success: true, cart: newCart };
    }

    getCartById(id) {
        const cart = this.carts.find(c => c.id === id);
        if (!cart) return null;
        return cart;
    }

    addProductToCart(cid, pid) {
        const cart = this.carts.find(c => c.id === cid);
        if (!cart) {
            return { success: false, message: 'Carrito no encontrado' };
        }

        const productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        this.saveCarts();

        return { success: true, cart: cart };
    }
}

module.exports = CartManager;