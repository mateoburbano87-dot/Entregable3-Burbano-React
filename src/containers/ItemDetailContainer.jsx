import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail';
import { obtenerProductoPorId } from '../services/firebase';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const cargarProducto = async () => {
      setCargando(true);
      setError(null);
      
      try {
        const productoObtenido = await obtenerProductoPorId(id);
        
        if (productoObtenido) {
          setProducto(productoObtenido);
        } else {
          setError("El producto no existe");
        }
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("No se pudo cargar el producto");
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="not-found-container">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe</p>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail producto={producto} />
    </div>
  );
}

export default ItemDetailContainer;