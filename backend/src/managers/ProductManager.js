// src/managers/ProductManager.js
// Gestor de productos con persistencia en FileSystem

const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../data/productos.json');

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            if (fs.existsSync(productosPath)) {
                const data = fs.readFileSync(productosPath, 'utf-8');
                this.products = JSON.parse(data);
                console.log(`📦 ${this.products.length} productos cargados`);
            } else {
                this.products = [];
                this.saveProducts();
                console.log('📁 Archivo productos.json creado');
            }
        } catch (error) {
            console.error('❌ Error al cargar productos:', error.message);
            this.products = [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(productosPath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('❌ Error al guardar productos:', error.message);
        }
    }

    generateId() {
        if (this.products.length === 0) return 1;
        const maxId = Math.max(...this.products.map(p => p.id));
        return maxId + 1;
    }

    getProducts(limit = null) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return null;
        return product;
    }

    addProduct(productData) {
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        for (const field of requiredFields) {
            if (!productData[field] && productData[field] !== 0) {
                return { success: false, message: `El campo "${field}" es obligatorio` };
            }
        }

        const exists = this.products.some(p => p.code === productData.code);
        if (exists) {
            return { success: false, message: `El código "${productData.code}" ya existe` };
        }

        const newProduct = {
            id: this.generateId(),
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status !== undefined ? productData.status : true,
            stock: productData.stock,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };

        this.products.push(newProduct);
        this.saveProducts();

        return { success: true, product: newProduct };
    }

    updateProduct(id, updateData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            return { success: false, message: 'Producto no encontrado' };
        }

        delete updateData.id;
        this.products[index] = { ...this.products[index], ...updateData };
        this.saveProducts();

        return { success: true, product: this.products[index] };
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            return { success: false, message: 'Producto no encontrado' };
        }

        this.products.splice(index, 1);
        this.saveProducts();

        return { success: true, message: 'Producto eliminado correctamente' };
    }
}

module.exports = ProductManager;