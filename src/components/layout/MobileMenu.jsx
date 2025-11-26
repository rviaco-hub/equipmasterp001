import React from "react";

const MobileMenu = ({ rolUser, setView, user, closeMenu }) => {
  return (
    <div className="mobile-menu">
      {!rolUser ?
        <ul>
          <li><button className="btn" onClick={() => setView("Capacitaciones") && closeMenu}>Capacitaciones</button></li>
          <li><button onClick={() => setView("Evaluaciones") && closeMenu}>Evaluaciones</button></li>
          <li><h3>{user}</h3></li>
        </ul> :
        <ul>
          <li><button onClick={() => setView("Dashboard") && closeMenu}>Reportes</button></li>
          <li><h3>{user}</h3></li>
        </ul>
      }
      <button className="close-btn" onClick={closeMenu}>Cerrar</button>

    </div>
  );
};

export default MobileMenu;

           