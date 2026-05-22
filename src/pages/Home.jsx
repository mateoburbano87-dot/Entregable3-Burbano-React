import { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import { obtenerProductosPorIds } from '../services/firebase';
import productosDestacados from '../data/productosDestacados';
import './Home.css';

function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductosDestacados = async () => {
      setCargando(true);
      setError(null);
      
      try {
        const productosObtenidos = await obtenerProductosPorIds(productosDestacados);
        setProductos(productosObtenidos);
      } catch (err) {
        console.error("Error al cargar productos destacados:", err);
        setError("No se pudieron cargar los productos destacados");
      } finally {
        setCargando(false);
      }
    };
    
    cargarProductosDestacados();
  }, []);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos destacados...</p>
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

  return (
    <div className="home-container">
      <section className="hero-banner">
        <h1>Bienvenido a TechStore</h1>
        <p>Los mejores productos tecnológicos al mejor precio</p>
        <p className="hero-subtitle">¡Ofertas exclusivas en productos seleccionados!</p>
      </section>

      <section className="destacados-section">
        <h2 className="section-title">✨ Productos Destacados ✨</h2>
        <p className="section-description">
          Productos seleccionados especialmente para ti
        </p>
        
        {productos.length === 0 ? (
          <div className="sin-productos">
            <p>No hay productos destacados disponibles</p>
          </div>
        ) : (
          <ItemList productos={productos} />
        )}
      </section>
    </div>
  );
}

export default Home;