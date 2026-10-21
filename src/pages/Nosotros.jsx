function Nosotros() {
  return (
    <section className="pagina-info">
      <div className="pagina-encabezado">
        <p className="etiqueta">Mercado Fresco</p>
        <h2>Quiénes somos</h2>
        <p>
          Trabajamos para ofrecer productos de calidad y mantener una
          gestión eficiente de nuestro inventario.
        </p>
      </div>

      <div className="info-grid">
        <article className="info-card">
          <span className="info-numero">01</span>
          <h3>Nuestra misión</h3>
          <p>
            Entregar una experiencia de compra confiable, ofreciendo
            productos de calidad y manteniendo una adecuada disponibilidad
            de nuestro inventario.
          </p>
        </article>

        <article className="info-card">
          <span className="info-numero">02</span>
          <h3>Nuestra visión</h3>
          <p>
            Ser un supermercado reconocido por la calidad de sus productos,
            la cercanía con sus clientes y una gestión eficiente de sus
            recursos.
          </p>
        </article>

        <article className="info-card">
          <span className="info-numero">03</span>
          <h3>Nuestro compromiso</h3>
          <p>
            Mantener nuestros productos disponibles y entregar información
            clara y actualizada para facilitar la experiencia de nuestros
            clientes.
          </p>
        </article>
      </div>
    </section>
  )
}

export default Nosotros