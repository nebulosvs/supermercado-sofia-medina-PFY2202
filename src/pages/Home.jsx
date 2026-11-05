
import { useInventario } from '../context/InventarioContext'
import TablaInventario from '../components/TablaInventario'

function Home() {
  const { productos } = useInventario()

  const totalUnidades = productos.reduce(
    (total, producto) => total + producto.stock,
    0
  )

  const productosStockBajo = productos.filter(
    (producto) => producto.stock > 0 && producto.stock <= 10
  ).length

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
          <strong>{totalUnidades}</strong>
        </div>

        <div className="resumen-card">
          <span>Stock bajo</span>
          <strong>{productosStockBajo}</strong>
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

        <TablaInventario productos={productos} />
      </div>
    </section>
  )
}

export default Home
