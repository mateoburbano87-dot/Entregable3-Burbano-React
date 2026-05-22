import Item from './Item';
import './ItemList.css';

function ItemList({ productos }) {
  if (!productos || productos.length === 0) {
    return (
      <div className="item-list-vacio">
        <p>No hay productos disponibles en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ItemList;