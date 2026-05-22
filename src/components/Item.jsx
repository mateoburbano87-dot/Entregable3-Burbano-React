import { Link } from 'react-router-dom';
import './Item.css';

function Item({ producto }) {
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  return (
    <div className="item-card">
      <div className="item-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="item-info">
        <h3 className="item-nombre">{producto.nombre}</h3>
        <p className="item-categoria">{producto.categoria}</p>
        <p className="item-precio">{formatearPrecio(producto.precio)}</p>
        <Link to={`/producto/${producto.id}`} className="item-boton">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}

export default Item;