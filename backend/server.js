// server.js
// Punto de entrada del servidor

const app = require('./src/app');

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📦 Endpoints disponibles:`);
    console.log(`   PRODUCTOS:`);
    console.log(`   - GET    /api/products`);
    console.log(`   - GET    /api/products/:pid`);
    console.log(`   - POST   /api/products`);
    console.log(`   - PUT    /api/products/:pid`);
    console.log(`   - DELETE /api/products/:pid`);
    console.log(`   CARRITOS:`);
    console.log(`   - POST   /api/carts`);
    console.log(`   - GET    /api/carts/:cid`);
    console.log(`   - POST   /api/carts/:cid/products/:pid`);
});

// Manejo de cierre del servidor
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    });
});