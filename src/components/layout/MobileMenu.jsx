import React from "react";

const MobileMenu = ({ rolUser, setView, user, closeMenu }) => {
  return (
    <div className="mobile-menu">
      {!rolUser ?
        <ul>
          <li><button onClick={() => setView("Perfil")}>Perfil</button></li>
          <li><button className="btn" onClick={() => setView("Capacitaciones")}>Capacitaciones</button></li>
          <li><button onClick={() => setView("Evaluaciones")}>Evaluaciones</button></li>
          <li><h3>{user}</h3></li>
        </ul> :
        <ul>
          <li><button onClick={() => setView("Perfil")}>Perfil</button></li>
          <li><button onClick={() => setView("Dashboard")}>Reportes</button></li>
          <li><h3>{user}</h3></li>
        </ul>
      }
      <button className="close-btn" onClick={closeMenu}>Cerrar</button>

    </div>
  );
};

export default MobileMenu;

           