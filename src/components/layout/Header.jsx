import React, { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo.png"; 

const Header = ({ user }) => {
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
         <img src={logo} alt="EquipMaster Logo" className="logo-img" />
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#">Capacitaciones</a>
        <a href="#">Evaluaciones</a>
        <a href="#">Reportes</a>
        <h4>{user}</h4>
      </nav>

      <div className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </div>

      {menuOpen && <MobileMenu user={user} closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;
