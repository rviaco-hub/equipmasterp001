import React, { useState } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">EquipMaster <span>Store</span></div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="#">Inicio</a>
        <a href="#">Capacitaciones</a>
        <a href="#">Evaluaciones</a>
        <a href="#">Reportes</a>
        <a href="#">Contacto</a>
      </nav>

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

      {menuOpen && <MobileMenu closeMenu={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;
