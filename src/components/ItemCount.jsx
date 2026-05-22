import { useState } from 'react';
import './ItemCount.css';

function ItemCount({ stock, initial, onAdd }) {
  const [cantidad, setCantidad] = useState(initial);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (stock > 0 && cantidad <= stock) {
      onAdd(cantidad);
    }
  };

  return (
    <div className="item-count">
      <div className="count-controles">
        <button 
          className="count-btn" 
          onClick={decrementar}
          disabled={cantidad <= 1}
        >
          -
        </button>
        <span className="count-numero">{cantidad}</span>
        <button 
          className="count-btn" 
          onClick={incrementar}
          disabled={cantidad >= stock}
        >
          +
        </button>
      </div>
      <button 
        className="count-agregar"
        onClick={agregarAlCarrito}
        disabled={stock === 0}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  );
}

export default ItemCount;