import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-marca">
          <strong>Mercado Fresco</strong>
          <p>Sistema de gestión de inventario</p>
        </div>

        <nav className="footer-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/nosotros">Quiénes somos</NavLink>
          <NavLink to="/contacto">Contáctanos</NavLink>
        </nav>
      </div>

      <div className="footer-copy">
        <p>© 2026 Mercado Fresco</p>
      </div>
    </footer>
  )
}

export default Footer