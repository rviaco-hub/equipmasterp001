import React from "react";
import products from "../../data/products";

const ProductGrid = () => {
  return (
    <section className="product-section">
      <h2 className="section-title">Catálogo de Capacitaciones</h2>
      <p className="section-subtitle">
        Explora nuestras capacitaciones disponibles en Seguridad y Salud en el Trabajo
      </p>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${p.image})` }}
            ></div>
            <div className="product-info">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <button>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
