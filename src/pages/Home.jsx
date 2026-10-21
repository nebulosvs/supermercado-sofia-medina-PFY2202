const productos = [
  {
    id: 1,
    nombre: 'Leche Entera',
    categoria: 'Lácteos',
    precio: 1290,
    stock: 24,
  },
  {
    id: 2,
    nombre: 'Pan de Molde',
    categoria: 'Panadería',
    precio: 2190,
    stock: 15,
  },
  {
    id: 3,
    nombre: 'Arroz 1 kg',
    categoria: 'Despensa',
    precio: 1690,
    stock: 32,
  },
  {
    id: 4,
    nombre: 'Manzanas',
    categoria: 'Frutas y Verduras',
    precio: 1990,
    stock: 18,
  },
  {
    id: 5,
    nombre: 'Aceite Vegetal',
    categoria: 'Despensa',
    precio: 2490,
    stock: 8,
  },
  {
    id: 6,
    nombre: 'Café Instantáneo',
    categoria: 'Bebidas',
    precio: 3990,
    stock: 5,
  },
]

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <p className="etiqueta">Sistema de inventario</p>
        <h2>Gestión de productos</h2>
        <p>
          Consulta los productos disponibles y controla el stock de
          Mercado Fresco.
        </p>
      </div>

      <div className="resumen">
        <div className="resumen-card">
          <span>Productos registrados</span>
          <strong>{productos.length}</strong>
        </div>

        <div className="resumen-card">
          <span>Unidades disponibles</span>
          <strong>
            {productos.reduce((total, producto) => total + producto.stock, 0)}
          </strong>
        </div>

        <div className="resumen-card">
          <span>Stock bajo</span>
          <strong>
            {productos.filter((producto) => producto.stock <= 10).length}
          </strong>
        </div>
      </div>

      <div className="inventario">
        <div className="inventario-header">
          <div>
            <p className="etiqueta">Inventario</p>
            <h3>Productos disponibles</h3>
          </div>

          <span>{productos.length} productos</span>
        </div>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <span
                      className={
                        producto.stock <= 10
                          ? 'estado stock-bajo'
                          : 'estado disponible'
                      }
                    >
                      {producto.stock <= 10
                        ? 'Stock bajo'
                        : 'Disponible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Home