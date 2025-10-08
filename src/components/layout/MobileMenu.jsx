import React from "react";

const MobileMenu = ({ closeMenu }) => {
  return (
    <div className="mobile-menu">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Capacitaciones</a></li>
        <li><a href="#">Evaluaciones</a></li>
        <li><a href="#">Reportes</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
      <button className="close-btn" onClick={closeMenu}>Cerrar</button>
    </div>
  );
};

export default MobileMenu;
