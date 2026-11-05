
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Alert,
} from '@mui/material'

import { useInventario } from '../context/InventarioContext'

const categorias = [
  'Lácteos',
  'Panadería',
  'Despensa',
  'Frutas y Verduras',
  'Bebidas',
  'Otros',
]

function AgregarProducto() {
  const { agregarProducto } = useInventario()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    marca: '',
    tipo: '',
    categoria: '',
    precio: '',
    stock: '',
  })

  const [error, setError] = useState('')

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setError('')
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    const nombre = formulario.nombre.trim()
    const marca = formulario.marca.trim()
    const tipo = formulario.tipo.trim()
    const precio = Number(formulario.precio)
    const stock = Number(formulario.stock)

    if (
      !nombre ||
      !marca ||
      !tipo ||
      !formulario.categoria ||
      formulario.precio.trim() === '' ||
      formulario.stock.trim() === ''
    ) {
      setError('Debes completar todos los campos.')
      return
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError('El stock debe ser un número entero mayor o igual a cero.')
      return
    }

    agregarProducto({
      nombre,
      marca,
      tipo,
      categoria: formulario.categoria,
      precio,
      stock,
    })

    navigate('/inventario', {
      state: {
        mensaje: 'Producto agregado correctamente al inventario.',
      },
    })
  }

  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Gestión de inventario</p>
        <h2>Agregar producto</h2>
        <p>
          Registra nuevos artículos en el inventario de Mercado Fresco.
        </p>
      </div>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          maxWidth: '800px',
          width: '100%',
          mx: 'auto',
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, color: '#166534', fontWeight: 700 }}
        >
          Información del producto
        </Typography>

        <Box
          component="form"
          onSubmit={manejarEnvio}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Nombre del producto"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            fullWidth
            required
          />

          <TextField
            label="Marca"
            name="marca"
            value={formulario.marca}
            onChange={manejarCambio}
            fullWidth
            required
          />

          <TextField
            label="Tipo de producto"
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
            fullWidth
            required
          />

          <TextField
            select
            label="Categoría"
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            fullWidth
            required
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Precio (CLP)"
            name="precio"
            type="number"
            value={formulario.precio}
            onChange={manejarCambio}
            inputProps={{ min: 1, step: 1 }}
            fullWidth
            required
          />

          <TextField
            label="Stock inicial"
            name="stock"
            type="number"
            value={formulario.stock}
            onChange={manejarCambio}
            inputProps={{ min: 0, step: 1 }}
            fullWidth
            required
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate('/inventario')}
              sx={{
                color: '#166534',
                borderColor: '#166534',
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#16803c',
                '&:hover': {
                  backgroundColor: '#166534',
                },
              }}
            >
              Guardar producto
            </Button>
          </Box>
        </Box>
      </Paper>
    </section>
  )
}

export default AgregarProducto
