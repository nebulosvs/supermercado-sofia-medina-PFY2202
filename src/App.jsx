
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Inventario from './pages/Inventario'
import AgregarProducto from './pages/AgregarProducto'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'

import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route
            path="/agregar-producto"
            element={<AgregarProducto />}
          />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
