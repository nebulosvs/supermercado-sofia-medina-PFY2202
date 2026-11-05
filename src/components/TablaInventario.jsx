
import { Link } from 'react-router-dom'

function TablaInventario({ productos }) {
  return (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <Link
                  to={`/producto/${producto.id}`}
                  className="enlace-producto"
                >
                  {producto.nombre}
                </Link>
              </td>

              <td>{producto.marca}</td>
              <td>{producto.tipo}</td>
              <td>{producto.categoria}</td>

              <td>
                ${producto.precio.toLocaleString('es-CL')}
              </td>

              <td>
                <span
                  className={`estado ${producto.stock === 0
                      ? 'sin-stock'
                      : producto.stock <= 10
                        ? 'stock-bajo'
                        : 'disponible'
                    }`}
                >
                  {producto.stock === 0
                    ? 'Sin stock'
                    : `${producto.stock} unidades`}
                </span>
              </td>
            </tr>
          ))}

          {productos.length === 0 && (
            <tr>
              <td colSpan={6} className="tabla-vacia">
                No se encontraron productos en esta categoría.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablaInventario
