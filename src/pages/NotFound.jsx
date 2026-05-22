import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>¡Página no encontrada!</h2>
        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn-volver-inicio">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;