import React, { useState } from "react";
import products from "../../data/products";
import ModalVideo from "./ModalVideo";

const ProductGrid = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

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
              <button onClick={() => setSelectedCourse(p)}>Ver más</button>
            </div>
          </div>
        ))}
      </div>

      <ModalVideo
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </section>
  );
};

export default ProductGrid;
