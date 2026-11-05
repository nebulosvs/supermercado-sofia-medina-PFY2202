
import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  Alert,
  Button,
  TextField,
  MenuItem,
} from '@mui/material'

import { useInventario } from '../context/InventarioContext'
import TablaInventario from '../components/TablaInventario'

function Inventario() {
  const { productos } = useInventario()
  const location = useLocation()

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState('Todas')

  const categorias = [
    'Todas',
    ...new Set(
      productos.map((producto) => producto.categoria)
    ),
  ]

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        )

  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Gestión de inventario</p>

        <h2>Inventario</h2>

        <p>
          Consulta los artículos registrados en Mercado Fresco.
        </p>
      </div>

      {location.state?.mensaje && (
        <Alert severity="success">
          {location.state.mensaje}
        </Alert>
      )}

      <div className="inventario">
        <div className="inventario-header">
          <h3>Productos registrados</h3>

          <Button
            component={Link}
            to="/agregar-producto"
            variant="contained"
            sx={{
              backgroundColor: '#16803c',
              '&:hover': {
                backgroundColor: '#166534',
              },
            }}
          >
            Agregar producto
          </Button>
        </div>

        <div className="filtros-inventario">
          <TextField
            select
            label="Filtrar por categoría"
            value={categoriaSeleccionada}
            onChange={(e) =>
              setCategoriaSeleccionada(e.target.value)
            }
            size="small"
            sx={{ minWidth: 240 }}
          >
            {categorias.map((categoria) => (
              <MenuItem
                key={categoria}
                value={categoria}
              >
                {categoria}
              </MenuItem>
            ))}
          </TextField>

          <span>
            Mostrando {productosFiltrados.length} de{' '}
            {productos.length} productos
          </span>
        </div>

        <TablaInventario productos={productosFiltrados} />
      </div>
    </section>
  )
}

export default Inventario
