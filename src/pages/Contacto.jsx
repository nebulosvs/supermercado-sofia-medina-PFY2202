import { useState } from 'react'

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [mensajeEnviado, setMensajeEnviado] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value,
    })

    setMensajeEnviado(false)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    setMensajeEnviado(true)

    setFormulario({
      nombre: '',
      correo: '',
      mensaje: '',
    })
  }

  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Atención al cliente</p>
        <h2>Contáctanos</h2>
        <p>
          ¿Tienes alguna consulta? Envíanos un mensaje y nuestro equipo
          se pondrá en contacto contigo.
        </p>
      </div>

      <div className="contacto-contenedor">
        <div className="contacto-info">
          <h3>Información de contacto</h3>

          <div className="dato-contacto">
            <span>Correo electrónico</span>
            <strong>contacto@mercadofresco.cl</strong>
          </div>

          <div className="dato-contacto">
            <span>Teléfono</span>
            <strong>+56 2 2345 6789</strong>
          </div>

          <div className="dato-contacto">
            <span>Horario de atención</span>
            <strong>Lunes a sábado, 09:00 - 20:00</strong>
          </div>
        </div>

        <form
          className="formulario-contacto"
          onSubmit={manejarEnvio}
        >
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="correo@ejemplo.cl"
              value={formulario.correo}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje"
              value={formulario.mensaje}
              onChange={manejarCambio}
              required
            ></textarea>
          </div>

          <button type="submit" className="boton-principal">
            Enviar mensaje
          </button>

          {mensajeEnviado && (
            <p className="mensaje-exito">
              ✓ Mensaje enviado correctamente.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contacto