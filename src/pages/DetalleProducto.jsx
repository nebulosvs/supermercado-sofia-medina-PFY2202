
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  Alert,
  Divider,
} from '@mui/material'

import { useInventario } from '../context/InventarioContext'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { productos, agregarAlCarrito } = useInventario()

  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const producto = productos.find(
    (item) => String(item.id) === String(id)
  )

  if (!producto) {
    return (
      <Alert severity="error">
        El producto solicitado no existe.
        <Button component={Link} to="/inventario">
          Volver al inventario
        </Button>
      </Alert>
    )
  }


  const manejarAgregar = () => {
    const cantidadNumero = Number(cantidad)

    // Validar que el campo no esté vacío
    if (String(cantidad).trim() === '') {
      setMensaje('Debes ingresar una cantidad.')
      return
    }

    // Validar que sea un número entero
    if (!Number.isInteger(cantidadNumero)) {
      setMensaje('La cantidad debe ser un número entero, sin decimales.')
      return
    }

    // Validar que sea mayor que cero
    if (cantidadNumero <= 0) {
      setMensaje('La cantidad debe ser mayor que cero.')
      return
    }

    // Validar que exista stock suficiente
    if (cantidadNumero > producto.stock) {
      setMensaje(
        `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`
      )
      return
    }

    // Agregar al carrito
    const resultado = agregarAlCarrito(producto.id, cantidadNumero)

    if (!resultado) {
      setMensaje('No fue posible agregar el producto. Intenta nuevamente.')
      return
    }

    setMensaje('')
    navigate('/carrito')
  }


  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Mercado Fresco</p>
        <h2>Detalle del producto</h2>
        <p>Consulta la información del artículo seleccionado.</p>
      </div>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: '#166534', mb: 1 }}
            >
              {producto.nombre}
            </Typography>

            <Typography color="text.secondary">
              Marca: {producto.marca}
            </Typography>
          </Box>

          <Chip
            label={producto.stock > 0 ? 'Disponible' : 'Sin stock'}
            color={producto.stock > 0 ? 'success' : 'error'}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <Typography color="text.secondary">Categoría</Typography>
            <Typography fontWeight={600}>
              {producto.categoria}
            </Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">Tipo</Typography>
            <Typography fontWeight={600}>
              {producto.tipo}
            </Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">Precio unitario</Typography>
            <Typography fontWeight={700} fontSize={24} color="#166534">
              ${producto.precio.toLocaleString('es-CL')}
            </Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">
              Stock disponible
            </Typography>
            <Typography fontWeight={600}>
              {producto.stock} unidades
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {mensaje && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mensaje}
          </Alert>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Cantidad"
            type="number"
            size="small"
            value={cantidad}
            onChange={(e) => {
              setCantidad(e.target.value)
              setMensaje('')
            }}
            inputProps={{
              min: 1,
              max: producto.stock,
              step: 1,
            }}
            sx={{ width: 130 }}
            disabled={producto.stock === 0}
          />

          <Button
            variant="contained"
            onClick={manejarAgregar}
            disabled={producto.stock === 0}
            sx={{
              backgroundColor: '#16803c',
              '&:hover': { backgroundColor: '#166534' },
            }}
          >
            Agregar al carrito
          </Button>

          <Button
            component={Link}
            to="/inventario"
            variant="outlined"
            sx={{
              color: '#166534',
              borderColor: '#166534',
            }}
          >
            Volver al inventario
          </Button>
        </Box>
      </Paper>
    </section>
  )
}

export default DetalleProducto
