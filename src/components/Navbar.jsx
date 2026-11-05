import { NavLink } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext'

function Navbar() {
  const { carrito } = useInventario()

  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )
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

          <NavLink
            to="/inventario"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Inventario
          </NavLink>

          <NavLink
            to="/agregar-producto"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Agregar producto
          </NavLink>
          <NavLink
            to="/carrito"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Carrito ({cantidadCarrito})
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar