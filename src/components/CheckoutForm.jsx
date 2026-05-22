import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { crearOrden } from '../services/firebase';
import './CheckoutForm.css';

function CheckoutForm() {
  const { carrito, precioTotal, vaciarCarrito } = useCart();
  const [ordenGenerada, setOrdenGenerada] = useState(null);
  const [cargando, setCargando] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  if (carrito.length === 0 && !ordenGenerada) {
    return (
      <div className="checkout-vacio">
        <h2>No tienes productos en el carrito</h2>
        <Link to="/" className="btn-volver">Ir a comprar</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      const ordenData = {
        comprador: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion
        },
        productos: carrito.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad
        })),
        total: precioTotal()
      };
      
      const ordenId = await crearOrden(ordenData);
      setOrdenGenerada(ordenId);
      vaciarCarrito();
      
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  if (ordenGenerada) {
    return (
      <div className="confirmacion-compra">
        <div className="confirmacion-icono">✅</div>
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de orden es: <strong>{ordenGenerada}</strong></p>
        <p>Te enviaremos un correo con los detalles de tu compra.</p>
        <Link to="/" className="btn-volver">Seguir comprando</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Finalizar compra</h1>
      
      <div className="checkout-grid">
        <div className="checkout-productos">
          <h3>Productos</h3>
          {carrito.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>{item.nombre} x {item.cantidad}</span>
              <span>{formatearPrecio(item.precio * item.cantidad)}</span>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Total: {formatearPrecio(precioTotal())}</strong>
          </div>
        </div>
        
        <div className="checkout-formulario">
          <h3>Datos del comprador</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+56 9 1234 5678"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                placeholder="Calle, número, ciudad"
              />
            </div>
            
            <button type="submit" className="btn-confirmar" disabled={cargando}>
              {cargando ? 'Procesando...' : 'Confirmar compra'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;