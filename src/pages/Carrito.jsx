
import { Link } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Alert,
  Chip,
} from '@mui/material'

import { useInventario } from '../context/InventarioContext'

function Carrito() {
  const {
    carrito,
    productos,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
  } = useInventario()

  const total = carrito.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  )

  const totalUnidades = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  )

  const formatoPrecio = (precio) =>
    `$${precio.toLocaleString('es-CL')}`

  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Mercado Fresco</p>
        <h2>Carrito de compras</h2>
        <p>
          Administra los productos seleccionados y sus cantidades.
        </p>
      </div>

      {carrito.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: '#166534' }}>
            Tu carrito está vacío
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Explora el inventario y selecciona los productos que deseas agregar.
          </Typography>

          <Button
            component={Link}
            to="/inventario"
            variant="contained"
            sx={{ backgroundColor: '#16803c' }}
          >
            Explorar productos
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr',
            },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {carrito.map((item) => {
              const productoInventario = productos.find(
                (producto) => producto.id === item.id
              )

              const stockDisponible = productoInventario?.stock ?? 0

              return (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: '#166534', fontWeight: 700 }}
                      >
                        {item.nombre}
                      </Typography>

                      <Typography color="text.secondary">
                        Precio unitario: {formatoPrecio(item.precio)}
                      </Typography>
                    </Box>

                    <Chip
                      label={`${stockDisponible} disponibles`}
                      color={stockDisponible > 0 ? 'success' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        aria-label={`Disminuir cantidad de ${item.nombre}`}
                        onClick={() => disminuirCantidad(item.id)}
                        sx={{
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      >
                        −
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 35,
                          textAlign: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {item.cantidad}
                      </Typography>

                      <IconButton
                        aria-label={`Aumentar cantidad de ${item.nombre}`}
                        onClick={() => aumentarCantidad(item.id)}
                        disabled={stockDisponible === 0}
                        sx={{
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                        }}
                      >
                        +
                      </IconButton>
                    </Box>

                    <Typography fontWeight={700} color="#166534">
                      {formatoPrecio(item.precio * item.cantidad)}
                    </Typography>

                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Paper>
              )
            })}
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#166534', fontWeight: 700, mb: 2 }}
            >
              Resumen de compra
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography color="text.secondary">
                Unidades
              </Typography>
              <Typography fontWeight={600}>
                {totalUnidades}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Typography fontWeight={700}>
                Total
              </Typography>

              <Typography fontWeight={700} color="#166534" fontSize={22}>
                {formatoPrecio(total)}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
              Este carrito es una demostración académica.
              No procesa pagos reales.
            </Alert>

            <Button
              component={Link}
              to="/inventario"
              fullWidth
              variant="outlined"
              sx={{
                color: '#166534',
                borderColor: '#166534',
              }}
            >
              Seguir agregando productos
            </Button>
          </Paper>
        </Box>
      )}
    </section>
  )
}

export default Carrito
