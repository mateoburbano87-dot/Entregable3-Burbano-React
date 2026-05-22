import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartWidget.css';

function CartWidget() {
  const { cantidadTotal } = useCart();
  const totalProductos = cantidadTotal();

  return (
    <Link to="/carrito" className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalProductos > 0 && (
        <span className="cart-count">{totalProductos}</span>
      )}
    </Link>
  );
}

export default CartWidget;