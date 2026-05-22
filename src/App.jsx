import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';                   
import ItemListContainer from './containers/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              {/* Ruta principal - AHORA muestra productos destacados */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta para ver TODOS los productos */}
              <Route path="/todos-los-productos" element={<ItemListContainer />} />
              
              {/* Ruta de productos por categoría */}
              <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
              
              {/* Ruta de detalle de producto */}
              <Route path="/producto/:id" element={<ItemDetailContainer />} />
              
              {/* Ruta de carrito */}
              <Route path="/carrito" element={<Cart />} />
              
              {/* Ruta de checkout */}
              <Route path="/checkout" element={<CheckoutForm />} />
              
              {/* Ruta de contacto */}
              <Route path="/contacto" element={<Contacto />} />
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2025 TechStore - Todos los derechos reservados</p>
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;