import React from "react";

const MobileMenu = ({ user, closeMenu }) => {
  return (
    <div className="mobile-menu">
      <ul>
        <li><a href="#">Capacitaciones</a></li>
        <li><a href="#">Evaluaciones</a></li>
        <li><a href="#">Reportes</a></li>
        <li><h3>{user}</h3></li>
      </ul>
      <button className="close-btn" onClick={closeMenu}>Cerrar</button>
    </div>
  );
};

export default MobileMenu;
