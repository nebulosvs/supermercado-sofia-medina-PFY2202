import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-contenido">
        <NavLink to="/" className="logo">
          <span className="logo-icono">M</span>

          <div>
            <strong>Mercado Fresco</strong>
            <small>Gestión de inventario</small>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/nosotros"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Quiénes somos
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Contáctanos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar