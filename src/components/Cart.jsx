import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, precioTotal } = useCart();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  if (carrito.length === 0) {
    return (
      <div className="cart-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos antes de continuar!</p>
        <Link to="/" className="btn-seguir-comprando">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-titulo">Mi Carrito</h1>
      
      <div className="cart-items">
        {carrito.map((item) => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.imagen} 
              alt={item.nombre} 
              className="cart-item-imagen"
            />
            <div className="cart-item-info">
              <h3>{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unitario: {formatearPrecio(item.precio)}</p>
              <p className="cart-item-subtotal">
                Subtotal: {formatearPrecio(item.precio * item.cantidad)}
              </p>
            </div>
            <button 
              className="btn-eliminar"
              onClick={() => eliminarDelCarrito(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-resumen">
        <h3>Resumen de compra</h3>
        <p className="cart-total">
          Total: {formatearPrecio(precioTotal())}
        </p>
        <div className="cart-acciones">
          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="btn-finalizar">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;