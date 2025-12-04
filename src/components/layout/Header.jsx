import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo.png";

const Header = ({ rolUser, setView, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Cerrar el menú cuando se supera el ancho de 771px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 771 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);



  return (
    <header className="header">
      <div className="logo-container">
        <img onClick={() => setView("Home")} src={logo} alt="EquipMaster Logo" className="logo-img" />
      </div>
      {!rolUser ?
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button onClick={() => setView("Perfil")}>Perfil</button>
          <button onClick={() => setView("Capacitaciones")}>Capacitaciones</button>
          <button onClick={() => setView("Evaluaciones")}>Evaluaciones</button>
          <h4>{user}</h4>
        </nav> :
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button onClick={() => setView("Perfil")}>Perfil</button>
          <button onClick={() => setView("Dashboard")}>Reportes</button>
          <h4>{user}</h4>
        </nav>
      }

      <div className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </div>

      {menuOpen && <MobileMenu rolUser={rolUser} setView={setView} user={user} closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;
