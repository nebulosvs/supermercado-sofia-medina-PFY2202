
import { createContext, useContext, useReducer } from 'react'

const InventarioContext = createContext(null)

const productosIniciales = [
  {
    id: 1,
    nombre: 'Leche Entera',
    marca: 'Colun',
    tipo: 'Lácteo',
    categoria: 'Lácteos',
    precio: 1290,
    stock: 24,
  },
  {
    id: 2,
    nombre: 'Pan de Molde',
    marca: 'Ideal',
    tipo: 'Pan',
    categoria: 'Panadería',
    precio: 2190,
    stock: 15,
  },
  {
    id: 3,
    nombre: 'Arroz 1 kg',
    marca: 'Tucapel',
    tipo: 'Arroz',
    categoria: 'Despensa',
    precio: 1690,
    stock: 32,
  },
  {
    id: 4,
    nombre: 'Manzanas',
    marca: 'Mercado Fresco',
    tipo: 'Fruta',
    categoria: 'Frutas y Verduras',
    precio: 1990,
    stock: 18,
  },
  {
    id: 5,
    nombre: 'Aceite Vegetal',
    marca: 'Chef',
    tipo: 'Aceite',
    categoria: 'Despensa',
    precio: 2490,
    stock: 8,
  },
  {
    id: 6,
    nombre: 'Café Instantáneo',
    marca: 'Nescafé',
    tipo: 'Café',
    categoria: 'Bebidas',
    precio: 3990,
    stock: 5,
  },
]

const estadoInicial = {
  productos: productosIniciales,
  carrito: [],
}

function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_PRODUCTO':
      return {
        ...estado,
        productos: [...estado.productos, accion.payload],
      }

    case 'ACTUALIZAR_STOCK': {
      const { id, nuevoStock } = accion.payload

      if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
        return estado
      }

      return {
        ...estado,
        productos: estado.productos.map((producto) =>
          producto.id === id
            ? { ...producto, stock: nuevoStock }
            : producto
        ),
      }
    }

    case 'AGREGAR_AL_CARRITO': {
      const { id, cantidad } = accion.payload

      const producto = estado.productos.find(
        (item) => item.id === id
      )

      if (
        !producto ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0 ||
        producto.stock < cantidad
      ) {
        return estado
      }

      const existente = estado.carrito.find(
        (item) => item.id === id
      )

      const productosActualizados = estado.productos.map(
        (item) =>
          item.id === id
            ? { ...item, stock: item.stock - cantidad }
            : item
      )

      const carritoActualizado = existente
        ? estado.carrito.map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        : [
            ...estado.carrito,
            {
              id: producto.id,
              nombre: producto.nombre,
              precio: producto.precio,
              cantidad,
            },
          ]

      return {
        productos: productosActualizados,
        carrito: carritoActualizado,
      }
    }

    case 'AUMENTAR_CANTIDAD': {
      const { id } = accion.payload

      const producto = estado.productos.find(
        (item) => item.id === id
      )

      const itemCarrito = estado.carrito.find(
        (item) => item.id === id
      )

      if (!producto || !itemCarrito || producto.stock <= 0) {
        return estado
      }

      return {
        productos: estado.productos.map((item) =>
          item.id === id
            ? { ...item, stock: item.stock - 1 }
            : item
        ),
        carrito: estado.carrito.map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      }
    }

    case 'DISMINUIR_CANTIDAD': {
      const { id } = accion.payload

      const itemCarrito = estado.carrito.find(
        (item) => item.id === id
      )

      if (!itemCarrito) {
        return estado
      }

      return {
        productos: estado.productos.map((item) =>
          item.id === id
            ? { ...item, stock: item.stock + 1 }
            : item
        ),
        carrito: estado.carrito
          .map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          )
          .filter((item) => item.cantidad > 0),
      }
    }

    case 'ELIMINAR_DEL_CARRITO': {
      const { id } = accion.payload

      const itemCarrito = estado.carrito.find(
        (item) => item.id === id
      )

      if (!itemCarrito) {
        return estado
      }

      return {
        productos: estado.productos.map((item) =>
          item.id === id
            ? {
                ...item,
                stock: item.stock + itemCarrito.cantidad,
              }
            : item
        ),
        carrito: estado.carrito.filter(
          (item) => item.id !== id
        ),
      }
    }

    default:
      return estado
  }
}

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(
    inventarioReducer,
    estadoInicial
  )

  const agregarProducto = (nuevoProducto) => {
    dispatch({
      type: 'AGREGAR_PRODUCTO',
      payload: {
        ...nuevoProducto,
        id: crypto.randomUUID(),
      },
    })
  }

  const actualizarStock = (id, nuevoStock) => {
    dispatch({
      type: 'ACTUALIZAR_STOCK',
      payload: { id, nuevoStock },
    })
  }

  const agregarAlCarrito = (id, cantidad) => {
    const producto = estado.productos.find(
      (item) => String(item.id) === String(id)
    )

    if (
      !producto ||
      !Number.isInteger(cantidad) ||
      cantidad <= 0 ||
      producto.stock < cantidad
    ) {
      return false
    }

    dispatch({
      type: 'AGREGAR_AL_CARRITO',
      payload: { id: producto.id, cantidad },
    })

    return true
  }

  const aumentarCantidad = (id) => {
    dispatch({
      type: 'AUMENTAR_CANTIDAD',
      payload: { id },
    })
  }

  const disminuirCantidad = (id) => {
    dispatch({
      type: 'DISMINUIR_CANTIDAD',
      payload: { id },
    })
  }

  const eliminarDelCarrito = (id) => {
    dispatch({
      type: 'ELIMINAR_DEL_CARRITO',
      payload: { id },
    })
  }

  return (
    <InventarioContext.Provider
      value={{
        productos: estado.productos,
        carrito: estado.carrito,
        agregarProducto,
        actualizarStock,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
      }}
    >
      {children}
    </InventarioContext.Provider>
  )
}

export function useInventario() {
  const contexto = useContext(InventarioContext)

  if (!contexto) {
    throw new Error(
      'useInventario debe utilizarse dentro de InventarioProvider'
    )
  }

  return contexto
}
