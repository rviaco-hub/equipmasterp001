import React from "react";

const noticias = [
  {
    id: 1,
    texto: "📅 Próxima capacitación: 15 de Octubre",
    imagen: "https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    texto: "✅ Recuerda completar la evaluación del módulo 1",
    imagen: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    texto: "📊 Informe de asistencia disponible",
    imagen: "https://images.unsplash.com/photo-1581091012184-5c66f47e93a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    texto: "🧠 Nuevo módulo de ergonomía disponible",
    imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  },
];

const News = () => {
  return (
    <aside className="aside-mural">
      <h3 className="aside-title">📰 Noticias & Recordatorios</h3>
      <div className="mural">
        {noticias.map((n) => (
          <div
            key={n.id}
            className="mural-item"
            style={{ backgroundImage: `url(${n.imagen})` }}
          >
            <div className="overlay"></div>
            <p>{n.texto}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default News;
