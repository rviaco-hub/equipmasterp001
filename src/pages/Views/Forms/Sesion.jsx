import React, { useState } from "react";

const AuthModal = ({ SetUser, SetIdUser, isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ cedula: "", nombre: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cedula || !form.nombre) {
      alert("Por favor completa todos los campos.");
      return;
    }
    console.log(`${isRegister ? "Registrando" : "Iniciando sesión"}:`, form);
    alert(`${isRegister ? "Registro" : "Inicio de sesión"} exitoso`);
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✖</button>

        <h2>{isRegister ? "Registro de Usuario" : "Inicio de Sesión"}</h2>
        <p>
          {isRegister
            ? "Crea tu cuenta para acceder al sistema de capacitaciones."
            : "Ingresa tus datos para continuar."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Ingresa tu número de cédula"
            value={form.cedula}
            onChange={handleChange}
          />

          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre completo"
            value={form.nombre}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            {isRegister ? "Registrarse" : "Ingresar"}
          </button>
        </form>

        <div className="auth-toggle">
          {isRegister ? (
            <p>
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => setIsRegister(false)}>Inicia sesión</span>
            </p>
          ) : (
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={() => setIsRegister(true)}>Regístrate</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
