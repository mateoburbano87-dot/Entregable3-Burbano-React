import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetail.css';

function ItemDetail({ producto }) {
  const { agregarAlCarrito } = useCart();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const onAdd = (cantidad) => {
    agregarAlCarrito(producto, cantidad);
    alert(`Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito`);
  };

  return (
    <div className="item-detail">
      <div className="detail-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      
      <div className="detail-info">
        <h1 className="detail-nombre">{producto.nombre}</h1>
        <p className="detail-categoria">{producto.categoria}</p>
        <p className="detail-precio">{formatearPrecio(producto.precio)}</p>
        <p className="detail-descripcion">{producto.descripcion}</p>
        
        <div className="detail-especificaciones">
          <h3>Especificaciones técnicas:</h3>
          <ul>
            {producto.especificaciones.map((esp, index) => (
              <li key={index}>{esp}</li>
            ))}
          </ul>
        </div>
        
        <p className="detail-stock">
          Stock disponible: {producto.stock} unidades
        </p>
        
        <ItemCount 
          stock={producto.stock} 
          initial={1} 
          onAdd={onAdd}
        />
      </div>
    </div>
  );
}

export default ItemDetail;