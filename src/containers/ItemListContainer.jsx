import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../components/ItemList';
import { obtenerProductos, obtenerProductosPorCategoria } from '../services/firebase';
import './ItemListContainer.css';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { categoriaId } = useParams();

  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true);
      setError(null);
      
      try {
        let productosObtenidos = [];
        
        if (categoriaId) {
          productosObtenidos = await obtenerProductosPorCategoria(categoriaId);
        } else {
          productosObtenidos = await obtenerProductos();
        }
        
        setProductos(productosObtenidos);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [categoriaId]);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const obtenerTitulo = () => {
    if (categoriaId) {
      const categorias = {
        computadores: 'Computadores',
        componentes: 'Componentes',
        accesorios: 'Accesorios'
      };
      return categorias[categoriaId] || categoriaId;
    }
    return 'Todos los productos';
  };

  return (
    <div className="item-list-container">
      <h1 className="page-title">{obtenerTitulo()}</h1>
      {productos.length === 0 ? (
        <p>No hay productos en esta categoría</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
}

export default ItemListContainer;